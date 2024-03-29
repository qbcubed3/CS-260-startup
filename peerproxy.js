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
}