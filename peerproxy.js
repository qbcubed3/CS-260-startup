const {WebSocketServer} = require('ws');
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
        console.log(hour + ":" + minute);
        if (true){
            console.log(connections);
            connections.forEach((c) =>{
                console.log(c);
                c.ws.send('Popup');
            })
        }
    }
    
    setInterval(checkTime, 60000);

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws};
        connections.push(connection);


        ws.on('message', function message(data) {
            connections.forEach((c) => {
              if (c.id !== connection.id) {
                c.ws.send(data);
              }
            });
        });

        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);

            if (pos >= 0) {
                connections.splice(pos, 1);
            }
        });

        ws.on('pong', () => {
            console.log("switching to true");
            connections.alive = true;
            console.log(connections);
        });
    });

    setInterval(() => {
        connections.forEach((c) => {
            if (!c.alive) {
                c.ws.terminate();
            } else{
                c.alive = false;
                c.ws.send('ping');
            }
        })
    }, 20000);
}

module.exports = peerProxy;