const {WebSocketServer} = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {

    const wss = new WebSocketServer({noServer: true});
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    wss.onopen = (event) =>{
        appendMs
    }

    httpServer.on('upgrade', (request, socket, head) =>{
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request)
        });
    });

    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws};
        connections.push(connection);

        //checks to see if it is time for the popup
        
        function checkTime(){
            const current = new Date();
            const hour = current.getHours();
            const minute = current.getMinutes();

            if (hour === 15 && minute === 45){
                connections.forEach((c) =>{
                    c.ws.send('Popup');
                })
            }
        }

        setInterval(checkTime, 60000);

        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);

            if (pos >= 0) {
                connections.splice(pos, 1);
            }
        });

        ws.on ('pong', () => {
            connections.alive = true;
        });
    });

    setInterval(() => {
        connections.forEach((c) => {
            if (!c.alive) {
                c.ws.terminate();
            } else{
                c.alive = false;
                c.ws.ping();
            }
        })
    }, 20000);
}

module.exports = peerProxy;