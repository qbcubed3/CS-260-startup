const trackings = {
    "2024-02-28": {
      key1: false,
      key2: true,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-02-29": {
      key1: true,
      key2: true,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-03-01": {
      key1: false,
      key2: true,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-02": {
      key1: false,
      key2: true,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-03": {
      key1: true,
      key2: false,
      key3: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-04": {
      key1: true,
      key2: true,
      key3: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-05": {
      key1: false,
      key2: false,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-06": {
      key1: true,
      key2: false,
      key3: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-07": {
      key1: false,
      key2: false,
      key3: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-08": {
      key1: true,
      key2: true,
      key3: true,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
  };
let amts = {

}

let ratios = {};

function createAmts(){
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

function getRatios() {
    var data = [];
    Object.values(amts).forEach(activity =>{
        console.log(activity);
        var point = (activity['happiness']/activity['seen']);
        data.push(point);
    })
    return data;
}

function getLabels(){
    var data = [];
    Object.keys(amts).forEach(activity =>{
        data.push(activity);
    })
    return data;
}
createAmts();


var ratioData = getRatios();
var graphLabels = getLabels();

const graphData = {
    labels: graphLabels,
    datasets: [{
        label:'Chart', 
        data: ratioData,
        backgroundColor: ['red', 'green', 'blue']
    }]
}

console.log(ratioData);
const chart = document.getElementById('barGraph').getContext('2d');

var myChart = new Chart(chart, {
    type: 'bar',
    data: ratioData
})

