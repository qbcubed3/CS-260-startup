document.getElementById("login").addEventListener('click', login);

//logs in a user
async function login() {
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;

    var passText = password.value;
    var userText = username.value;
    var message;
    password.value = "";
    username.value = "";
    console.log(username + password);
    try{
      const response = await fetch('/api/login',{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json();
    // Access the authToken from the response object
    const message = data.message;
    const authToken = data.authToken;
    localStorage.setItem("auth", authToken);
    if (response.status !== 302){
      window.location.href = "survey.html";
      return;
    }
    }
    catch (error){
      console.log(error.message);
      document.getElementById("error").textContent = message;
      console.log('bad request');
    }
    setTimeout(function () {
      document.getElementById("error").textContent = "Could not log you in. Bad Password";
  }, 1000);
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
