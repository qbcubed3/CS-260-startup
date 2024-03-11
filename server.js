const express = require('express');
const app = express();

const port = 3046;

var apiRouter = express.Router();
app.use('/api', apiRouter);

app.use(express.json());
app.use(express.static('public'));

//sets the survey answers
apiRouter.post('/survey/answers', (req, res) =>{
    const received = req.body;
    var date = new Date();
    trackings[date] = received;
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
    surveyItems.push(item);
});

//deletes an item from the survey
apiRouter.post('/survey/delete', (req, res) =>{
    const item = req.body;
    surveyItems.pop(item);
});

//puts the page on index if none specified
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

//runs on the port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});




//variables
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