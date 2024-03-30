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
            })      
    }
    catch (error){
        console.log('bad request')
        return;
    }
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
  window.location.href = "index.html";
}