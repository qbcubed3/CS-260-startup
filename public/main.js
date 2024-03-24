document.getElementById("login").addEventListener('click', login);

//logs in a user
async function login() {
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;

    var passText = password.value;
    var userText = username.value;

    password.value = "";
    username.value = "";
    console.log("username: " + userText + "password: " + passText);
    try{
      const response = await fetch('/api/login',{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
    // Access the authToken from the response object
      const authToken = data.authToken;
      localStorage.setItem("auth", authToken);
      });
    }
    catch (error){
      console.log('bad request');
    }
    window.location.href = "survey.html";
}

async function randomJoke() {
    var joke;
    try{
        fetch('https://official-joke-api.appspot.com/jokes/random')
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const setup = data.setup;
                const punchline = data.punchline;
                document.getElementById("setup").textContent = setup;
                document.getElementById("punchline").textContent= punchline;
                console.log(setup + " : " + punchline);
            })      
    }
    catch (error){
        console.log('bad request')
        return;
    }
    console.log(joke);
}

randomJoke();

document.getElementById("logout").addEventListener('click', logout);

async function logout(){
  const body = {
    authToken: localStorage.getItem("auth")
  }
  try{
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    });
  }
  catch{
    console.log("ERROR")
    return;
  }
  localStorage.removeItem("auth");
  console.log("logged out");
}