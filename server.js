const {checkAuth, checkPass, checkUser, addUser, addItem, addScores, newAuth, getItems, deleteItem, getScores, removeAuth} = require('./database.js');
const peerProxy = require('./peerProxy.js')
const express = require('express');
const app = express();

const port = 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);



apiRouter.post('/login', async (req, res) =>{
const {username, password} = req.body;
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

//gets the scores from the survey
apiRouter.post('/survey/answers', async (req, res) =>{    
var received = req.body;
const auth = received.auth;
const user = await checkAuth(auth);
const data = received.scores;
if (user){
  addScores(user, data);
  res.status(200).json({"message": "added scores"});
}
else{
  res.status(302).json({"message": "badAuth"});
}
});

//receives the current survey data
apiRouter.post('/survey/get', async (req, res) =>{
  const bondy = req.body;
  const auth = bondy.authToken;
  const user = await checkAuth(auth);
  console.log(user);
  const items = await getItems(user);
  console.log(items);
  res.json({"items": items});
})

//Updates the Survey
apiRouter.post('/survey/update', async (req, res) =>{
  const bondy = req.body;
  const auth = bondy.authToken;
  const user = await checkAuth(auth);
  var items;
  if (user){
    items = await getItems(user);
  }
  else{
    console.log("Cant log you in, authToken is invalid");
    res.json({'message':'bad'});
    return;
  }
  console.log(items);
  res.json({"items": items});
});

//adds an item to the survey
apiRouter.post('/survey/add', async (req, res) =>{
  const auth = req.body.authToken;
  const user = await checkAuth(auth);
  if (user){
    addItem(req.body.item, user);
    res.json({'response': 'valid'});
  }
  else{
    console.log("BAD AUTH");
  }
});

//deletes an item from the survey
apiRouter.post('/survey/delete', async (req, res) =>{
  const auth = req.body.authToken;
  const user = await checkAuth(auth);
  if (user){
    deleteItem(req.body.item, user);
    res.json({"response": "valid"});
  }
  else{
    res.json({"response": "BAD AUTH"});
  }
});

//gets the amounts from the server
apiRouter.post('/stats/get', async (req, res) =>{
console.log("called it");
const auth = req.body.authToken;
const user = await checkAuth(auth);
console.log(user);
if (user){
  const final = await getScores(user)
  console.log(final);
  res.json({"scores": final})
}
else{
  res.status(201);
}
})

//removes the auth from the database
apiRouter.post('/logout', async (req, res) =>{
const auth = req.body.authToken;
console.log(auth);
if (await removeAuth(auth)){
  console.log("removed auth");
}
else{
  console.log("coudn't find auth");
}
res.status(200).json({"message": "logged out"})

})

//puts the page on index if none specified
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

//runs on the port
const httpService = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

peerProxy(httpService);