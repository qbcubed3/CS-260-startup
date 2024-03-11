const express = require('express');
const app = express();

const port = 3046;

var apiRouter = express.Router();
app.use('/api', apiRouter);

app.use(express.json());

//receives the survey answers
apiRouter.post('/survey/answers', (req, res) =>{
    const received = req.body();
})

apiRouter.post('/survey/update', (req, res) =>{
    req.body
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});





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