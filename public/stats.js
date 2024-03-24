const trackings = {
    "2024-02-28": {
      Worked: false,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-02-29": {
      Worked: true,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-03-01": {
      Worked: false,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-02": {
      Worked: false,
      Had_Breakfast: true,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-03": {
      Worked: true,
      Had_Breakfast: false,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-04": {
      Worked: true,
      Had_Breakfast: true,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-05": {
      Worked: false,
      Had_Breakfast: false,
      Took_a_Walk: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-06": {
      Worked: true,
      Had_Breakfast: false,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-07": {
      Worked: false,
      Had_Breakfast: false,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-08": {
      Worked: true,
      Had_Breakfast: true,
      Took_a_Walk: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    }
  };
let amts = {

}

let ratios = {};
/*
async function createAmts(){
  var response = await fetch('/stats/addItem', {
    method: 'GET',
    headers: {'content-type': 'application/json'},
  })

  Object.values(trackings).forEach(day => {
      Object.entries(day).forEach(([key, value]) => {
          if (key === 'happiness'){
              return;
          }
          if (!(key in amts)){
              if (value){
                  let newItem = {seen: 1, happiness: day['happiness']};
                  amts[key] = newItem;
              }
          }
          else{
              if (value){
                  amts[key]['seen'] += 1;
                  amts[key]['happiness'] += day['happiness'];
              }
          }
      })
  })
  
}
*/
async function getRatios() {
  const body = {
    authToken: localStorage.getItem("auth")
  }
  var response = await fetch('/api/stats/get', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(body)
  })
  const data = await response.json();
  const items = data.scores;
  return items;
}

async function getLabels(){
  const body = {
    authToken: localStorage.getItem("auth")
  }
  var response = await fetch('/api/survey/get', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(body)
  })
  const data = await response.json();
  const questions = data.items;
  return questions;
}

async function getData(){
  var response = await fetch('/api/stats/get', {
    method: 'GET',
    headers: {'content-type': 'application/json'},
  })
  var jsonData = await response.json();
  console.log(jsonData);
  amts = jsonData;
}

async function graph(){
  var ratioData = await getRatios();
  var graphLabels = await getLabels();
  const graphData = {
        
  }
  const chart = document.getElementById('barGraph');

  console.log("ratio" + " " + ratioData);
  console.log("labels " + graphLabels);

  new Chart(chart, {
    type: 'bar',
    data: {
        labels: graphLabels,
        datasets: [{
        label:'Average Happiness for Activity', 
        data: ratioData,
        borderWidth: 1
        }]
    },
    options: {
      scales: {
          y: {
              beginAtZero: true
          }
      },
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: false
        }
      }
    }
  })
};

graph();
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
  localStorage.removeItem("auth");
  try{
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    });
  }
  catch{
    console.log("ERROR")
  }
  console.log("logged out");
}