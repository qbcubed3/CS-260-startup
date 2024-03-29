document.getElementById("close").addEventListener('click', closePopup);
document.getElementById("goSurvey").addEventListener('click', closePopup);
document.getElementById("goSurvey").addEventListener('click', function(){
    window.location.href = "survey.html";
})

createSocket();

async function createSocket(){
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = async () => {
        console.log("Websocket connection made");
    }
    socket.onerror = async (event) => {
        console.log("error: " + event);
    }
    socket.onmessage = async (event) => {
        if (event.data === 'Popup'){
            showPopup();
        }
        socket.send('pong');
    }
    socket.onclose = async () => {
        console.log("websocket connection closed");
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
  