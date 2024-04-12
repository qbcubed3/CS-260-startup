const { MongoClient } = require('mongodb');

const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');
const jwt = require('jsonwebtoken');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const users = db.collection('users');
const scoreCollection = db.collection('scores');
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
    return newAuth(username)
}

async function newAuth(user){
    const key = "myKey";
    const token = jwt.sign(user, key);
    await auths.insertOne({username: user, authToken: token});
    return token;
}

async function checkAuth(auth){
    const thing = await auths.findOne({authToken: auth})
        if (thing){
            return thing.username;
        }
        else{
            return false;
        }
};

async function checkUser(username){
    const user = await users.findOne({username});
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
        const result = await scoreCollection.insertOne({
            username: username,
            date: curDate,
            scores: scores
        })
    }
    catch (error){
        console.log("trouble inserting into the database " + error.message);
    }
}

async function getItems(user){
    const result = await items.findOne({username: user});
    const things = [
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
    ]
    if (result == null){
        const result2 = await items.insertOne(
            {username: user, items:things}
        ); 
        return things;
    }
    else{
        return result.items;
    }
}

async function addItem(item, user){
    const result = await items.findOne({username: user});
    var things;
    if (result === null){
        things = await getItems(user);
    }
    else{
        things = result.items;
    }
    let index = things.indexOf(item);
    if (index !== -1){
        return;
    }
    things.push(item);
    const filter = { username: user };
    const updateDoc = {
        $set: {
            items: things,
        }
    };
    const result2 = await items.updateOne(filter, updateDoc);
}

async function deleteItem(item, user){
    const result = await items.findOne({username: user});
    var things;
    if (result === null){
        things = await getItems(user);
    }
    else{
        things = result.items;
    }
    let index = things.indexOf(item);
    if (index === -1){
        return;
    }
    things.splice(index, 1);
    const filter = { username: user };
    const updateDoc = {
        $set: {
            items: things,
        }
    };
    const result2 = await items.updateOne(filter, updateDoc);
}

async function removeAuth(auth){
    const result = await auths.deleteOne({authToken: auth})
    if (result.deletedCount === 0){
        return false;
    }
    return true;
}

async function getScores(user){
    const results = await scoreCollection.find({username: user}).toArray();
    let seen = {};
    let happiness = {};
    results.forEach(doc =>{
        var happy = parseFloat(doc.scores.happiness);
        Object.entries(doc.scores).forEach(([key, value]) =>{
            if (key === "happiness"){
                return;
            }
            if (value){
                if (seen.hasOwnProperty(key)){
                    seen[key] += 1;
                    happiness[key] += happy;
                }
                else{
                    seen[key] = 1;
                    happiness[key] = happy;
                }
            }
        })
    })
    let final = {};
    Object.entries(seen).forEach(([key, value]) =>{
        final[key] = happiness[key]/seen[key]
    })
    return final;
}

module.exports = {addScores, checkPass, checkUser, addUser, getItems, addItem, checkAuth, newAuth, deleteItem, removeAuth, getScores};