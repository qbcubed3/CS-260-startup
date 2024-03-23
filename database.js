const MongoDB = require('mongodb');
const { MongoClient } = MongoDB;

const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const users = db.collection('users');
const scores = db.collection('scores');
const items = db.collection('items');

(async function testConnection() {
    await client.connect();
    await db.command({ping: 1});
}).catch((ex) => {
    console.log('Unable to connect to database');
    process.exit(1);
});

async function addUser(username, password){
    const hashedPass = bcrypt.hash(password);
    const result = await users.insertOne({username: username, password: hashedPass});
    return result
}

async function checkUser(username){
    const user = users.findOne({username});
    if (user == null){
        return false;
    }
    return true;
}

async function checkPass(username, password){
    try{
        const user = users.findOne({username});
        const hashedPass = user.password;
        if (bcrypt.compare(password, hashedPass)){
            return true;
        }
        return false;
    }
    catch (error){
        console.log("trouble inserting into the database");
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