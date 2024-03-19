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
    "Unplugged before bedtime"
];

var trackings = {"2024-02-28": {
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
}}

var amts = {};

const express = require('express');
const app = express();

const port = 3046;

var apiRouter = express.Router();
app.use('/api', apiRouter);

app.use(express.json());

//sets the survey answers
apiRouter.post('/survey/answers', (req, res) =>{    
  var received = req.body;
  var date = new Date();
  trackings[date] = received
  res.json({'response': 'valid'})
});

//receives the current survey data
apiRouter.get('/survey/get', (req, res) =>{
    res.json({'trackings': trackings});
})

//Updates the Survey
apiRouter.post('/survey/update', (req, res) =>{
    const received = req.body;
    surveyItems = received;
    res.json({'response': 'valid'});
});

//adds an item to the survey
apiRouter.post('/survey/add', (req, res) =>{
    const item = req.body;
    if (surveyItems){
      addSurvey(item);
    }
    else{
      surveyItems = {}
    }
    res.json({'response': 'valid'});
});

//deletes an item from the survey
apiRouter.post('/survey/delete', (req, res) =>{
    console.log("made it");
    const item = req.body;
    dropSurvey(item);
    res.json({'response': 'valid'});
});

//updates the activities and amts
apiRouter.get('/stats/addItem', (req, res) =>{
  console.log("happening");  
  createAmts();
  console.log(amts);
  res.end();
})

//gets the amounts from the server
apiRouter.get('/stats/get', (req, res) =>{
  console.log(amts);  
  res.send(JSON.stringify(amts));
})

//puts the page on index if none specified
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

//runs on the port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


function createAmts(){
  console.log(trackings);
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

function addSurvey(item){
    surveyItems.push(item);
}
function dropSurvey(item){
    surveyItems.pop(item);
}