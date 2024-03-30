const {WebSocketServer} = require('ws');
const DB = require("./database.js");
const uuid = require('uuid');

function peerProxy(httpServer) {
    const wss = new WebSocketServer({noServer: true});

    httpServer.on('upgrade', (request, socket, head) =>{
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request)
        });
    });

    let connections = [];

    //checks to see if it is time for the popup
    function checkTime(){
        const current = new Date();
        const hour = current.getHours();
        const minute = current.getMinutes();
        if (hour === 19 && minute == 0){
            connections.forEach((c) =>{
                c.ws.send('Popup');
            })
        }
    }
    
    setInterval(checkTime, 60000);

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws};
        connections.push(connection);


        ws.on('message', async (message) => {
            if (message === 'pong'){
                connections.alive = true;
            }
            else{
                try{
                    const data = JSON.parse(message);
                    const auth = data.user;
                    const user = await DB.checkAuth(auth);
                    if (!user){
                        return;
                    }
                    const mes = data.message;
                    const chatMessage = user + ": " + mes;
                    connections.forEach((c) => {
                        c.ws.send(chatMessage);
                    })
                }
                catch (error){}
            }
        });

        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);

            if (pos >= 0) {
                connections.splice(pos, 1);
            }
        });

        ws.on('pong', () => {
            connections.alive = true;
            console.log(connections);
        });
    });

    setInterval(() => {
        connections.forEach((c) => {
                connections.alive = false;
                c.ws.send('ping');
            })
        }, 10000);
}

module.exports = peerProxy;