const express = require('express');
const app = express();

const port = 3046;

var apiRouter = express.Router();

app.use(express.json());

app.use(express.static('public'));

//receives the survey answers
apiRouter.post('/survey/answers', (req, res) =>{
    submitSurvey();
})

apiRouter.post('/survey/update', (req, res) =>{
    req.body
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});