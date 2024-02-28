document.getElementById("close").addEventListener('click', closePopup);
document.getElementById("goSurvey").addEventListener('click', closePopup);
document.getElementById("goSurvey").addEventListener('click', function(){
    window.location.href = "survey.html";
})
randomPopup();
function closePopup(){
    var popup = document.getElementById("popup-container");
    popup.style.display = "none";
}

function showPopup(){
    var popup = document.getElementById("popup-container");
    popup.style.display = "flex";
}

function randomPopup() {
    const randomTime = Math.floor(Math.random() * 10000) + 5000;
    setTimeout(showPopup, randomTime);
    setTimeout(randomPopup, 200000);
  }
  