document.getElementById("login").addEventListener('click', login);

//logs in a user
function login() {
    console.log("is this even running");
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;

    var passText = password.value;
    var userText = username.value;

    password.value = "";
    username.value = "";

    window.location.href = "survey.html";
}

async function randomJoke() {
    var joke = "why did the chicken cross the road"
    try{
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const joke = response.json();
    }
    catch (error){
        console.log('bad request')
        return;
    }
    document.getElementById('joke').textContent = joke;
}

randomJoke();