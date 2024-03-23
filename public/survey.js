var surveyItems = [
    "Morning meditation",
    "Worked out",
    "Ate Breakfast",
    "Talked to a Friend",
    "Learned something new",
    "Took a walk",
    "Listened to music",
    "Did a Hobby",
    "Read a book",
    "Wrote in a journal",
    "Ate lunch",
    "Took Breaks from Work",
    "Disconnect from technology for a bit",
    "Had coffee/tea",
    "Did something creative",
    "Help someone in need",
    "Planned for future goals",
    "Laughed or watched something funny",
    "Attend a social event",
    "Ate Dinner",
    "Had restful sleep",
    "Unplugged before bedtime"]

let trackings = {}

document.addEventListener('DOMContentLoaded', function() {
    createList(surveyItems);
    var happinessRange = document.getElementById('happinessRange');
    var selectedHappiness = document.getElementById('selectedHappiness');
    happinessRange.addEventListener('input', updateValue);
    
    function updateValue() {
        selectedHappiness.textContent = happinessRange.value;
    }
});

document.getElementById("addNew").addEventListener('click', addItem);
document.getElementById("remove").addEventListener('click', deleteItem);
document.getElementById("submit").addEventListener('click', submitSurvey);

async function createList(array) {
    var list = document.createElement("ul");

    list.id = "listContainer";

    array.forEach(function(item) {
        var label = document.createElement('label');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.textContent = item;
        checkbox.id = item;

        checkbox.style.padding = 0;

        label.textContent = item;

        list.appendChild(checkbox);
        list.appendChild(label);
        list.appendChild(document.createElement('br'));
    })
    try{
        const response = await fetch('/api/survey/update', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(surveyItems)
        });
    }
    catch{
        return;
    }


    document.getElementById('checkboxes').appendChild(list);
}

async function addItem(){
    var newItem = document.getElementById("newItem").value;
    const auth = localStorage.getItem("auth");
    const body = {
        authToken: auth,
        item: newItem
    }
    try{
        const response = await fetch('/api/survey/add', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body)
        });
    }
    catch{
        return;
    }
    updateList();

    document.getElementById("newItem").value = "";
}

async function updateList(){
    var list = document.getElementById("listContainer");

    list.innerHTML = "";
    const auth = localStorage.getItem("auth");
    try{
        const response = await fetch('/survey/update', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({auth})
        });
    }
    catch (error){
        console.log(error.message);
    }
    surveyItems.forEach(function(item) {
        var label = document.createElement('label');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.textContent = item;
        checkbox.id = item;

        label.textContent = item;

        list.appendChild(checkbox);
        list.appendChild(label);
        list.appendChild(document.createElement('br'));
    });
}

async function deleteItem() {
    var remove = document.getElementById("deleteItem").value;

    console.log(remove);
    var index = surveyItems.indexOf(remove);

    if (index !== -1){
        surveyItems.splice(index, 1);
        try{
            const response = await fetch('api/survey/delete', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(remove),
            });
        }
        catch{
            return;
        }

        updateList();
    }

    document.getElementById("deleteItem").value = "";

}

async function submitSurvey() {
    const date = new Date();
    var list = document.getElementById("checkboxes");
    var newDay = {}
    var key = "";
    var checks = document.getElementById("checkboxes").getElementsByTagName('input');
    console.log(checks);
    for(i=0; i < checks.length; i++){
        console.log(checks[i])
        key = checks[i].id;
        newDay[key] = checks[i].checked;
    }
    newDay['happiness'] = document.getElementById('happinessRange').value;
    console.log("adding score");
    const data = {
        auth: localStorage.getItem("auth"),
        scores: newDay
    }
    //trackings[date] = newDay;
    try{
        var response = await fetch('/api/survey/answers', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(ndata)
        });
    }
    catch{
        console.log("ERROR")
        return;
    }
    updateList();
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
