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