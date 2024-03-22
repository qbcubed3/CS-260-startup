const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const users = db.collection('users');
const scores = db.collection('scores');

(async function testCOnnection() {
    await client.connect();
    await db.command({ping: 1});
}).catch((ex) => {
    console.log('Unable to connect to database');
    process.exit(1);
});

async function addUser(username, password){
    const hashedPass = bcrypt.hash(password);
    const result = await users.insertOne({username, hashedPass});
    return result
}

async function checkUser(username, password){
    const user = users.findOne({username});
    const hashedPass = user.password;
    if (bcrypt.compare(password, hashedPass)){
        return true;
    }
    return false;
}

async function addScores(username, scores){

}