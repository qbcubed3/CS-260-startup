const { MongoClient } = require('mongodb');

const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');
const jwt = require('jsonwebtoken');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const users = db.collection('users');
const scores = db.collection('scores');
const items = db.collection('items');
const auths = db.collection('auths');

(async function testConnection() {
    await client.connect();
    await db.command({ping: 1});
})().catch((ex) => {
    console.log(`Unable to connect to database because ${ex.message}`);
    process.exit(1);
});

async function addUser(username, password){
    const salt = 5;
    const hashedPass = await bcrypt.hash(password, salt);
    const result = await users.insertOne({username: username, password: hashedPass});
    const key = "myKey";
    const token = jwt.sign(username, key);
    auths.insertOne({authToken: token});
    localStorage.setItem("auth", token);
}

async function checkAuth(){
    const auth = localStorage.getItem("auth");
    const result = await auths.findOne({authToken: auth}, (err, result) =>{
        if (err) {
            return false;
        }
        if (result){
            return true;
        }
    });
}

async function checkUser(username){
    const user = await users.findOne({username});
    console.log('user ' + user);
    if (user === null){
        return false;
    }
    else{
        return true;
    }
}

async function checkPass(username, password){
    try{
        const user = await users.findOne({username});
        const hashedPass = user.password;
        const same = await bcrypt.compare(password, hashedPass);
        if (same){
            return true;
        }
        return false;
    }
    catch (error){
        console.log("trouble inserting into the database " + error.message);
    }
}

async function addScores(username, scores){
    try{
        const curDate = new Date();
        const result = await scores.insertOne({
            username: username,
            date: curDate,
            scores: scores
        })
    }
    catch (error){
        console.log("trouble inserting into the database")
    }
}

async function getItems(user){
    const result = await items.findOne({user});
    if (result == null){
        const result2 = await items.updateOne(
            {$set: {["items"]: [
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
            ]}},
            {$set: {["username"]: user}}
        ); 
        return result2.items;
    }
    else{
        return result.items;
    }
    
}

async function addItem(item, username){
    const result = await items.findOne({username});

}
module.exports = {addScores, checkPass, checkUser, addUser, getItems, addItem};