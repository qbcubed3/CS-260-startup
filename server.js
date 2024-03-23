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

currentUser = "user";
var amts = {};

const {addScores, checkPass, checkUser, addUser, getItems, addItem} = require('./database.js');
const express = require('express');
const app = express();

const port = 3046;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);



apiRouter.post('/login', async (req, res) =>{
  const {username, password} = req.body;
  console.log("username: " + username + "password: " + password);
  try{
    if (await checkUser(username)){
      if (await checkPass(username, password)){
        const auth = await newAuth(username);
        res.status(200).json({ message: "logged in", authToken: auth });
        return
      }
      else{
        res.status(302).json({message: "bad password"});
        return;
      }
    }
    else{
      const auth = await addUser(username, password);
      res.status(200).json({message: "registered and logged in", authToken: auth});
    }
  }
  catch (error){
    console.error();
  }
})

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
apiRouter.get('/survey/update', (req, res) =>{
    const auth = req.body;
    
    const items = getItems();
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