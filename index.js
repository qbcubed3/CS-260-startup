const express = require('express');
const app = express();

const port = 3046;

var apiRouter = express.Router();

app.use(express.json());

app.use(express.static('public'));

//receives the survey answers
apiRouter.post('/answers', (req, res) =>{
    res.send()
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

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