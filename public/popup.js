document.getElementById("close").addEventListener('click', closePopup);
document.getElementById("goSurvey").addEventListener('click', closePopup);
document.getElementById("goSurvey").addEventListener('click', function(){
    window.location.href = "survey.html";
})


const protocol = window.location.protocol === 'http' ? 'ws' : 'wss';
var socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
this.socket.onmessage() = async (event) => {
    if (event.data === 'Popup'){
        showPopup();
    }
}

function closePopup(){
    var popup = document.getElementById("popup-container");
    popup.style.display = "none";
}

function showPopup(){
    var popup = document.getElementById("popup-container");
    popup.style.display = "flex";
}
  