const WebSocket = require('ws');
const WebSocketServer = require('websocket').server;
const express = require('express');
const bodyParser = require("body-parser");
const sapp = express();
const app = express();
const path = require('path');
const wsport = process.env.PORT || 8181;
const xport = process.env.PORT || 80;
const wsserver = sapp.listen(wsport);
const xserver = app.listen(xport);
const router = express.Router();
wsserver.timeout = 1000 * 60; // 1 minutes in milliseconds

console.log((new Date()) + 'Express Server is listening on port ' + xport);

PeerIdGenerator = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
        var b = 16 * Math.random() | 0;
        return ("x" === a ? b : b & 3 | 8).toString(16);
    });
};

var clients = [];
var resources = [];

// Use middleware to set the default Content-Type
sapp.use(function (req, res, next) {
    res.header('Content-Type', 'text/html');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function (req, res, next) {
    res.header('Content-Type', 'text/html');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

sapp.use(bodyParser.urlencoded({extended: false}));
sapp.use(bodyParser.json());

app.use(express.static('public'));
app.get('/console', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/console.html'));
});


app.get('/dialog', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/console.html'));
});

app.post('/log', (req, res) => {
    console.log((new Date()) + ' Received request for ' + req.url);
    log = JSON.parse(req.body.log);
    if (log.type === "resource")
        if (log.resource.fallback) {
            console.log('Resource fallback alert!');
        }
    res.send(JSON.stringify({message: "Unable to log the request"}));
    res.end();
});

sapp.post('/search', (req, res) => {
    res.set({'Content-Type': 'application/json'});
    console.log((new Date()) + ' Received request for ' + req.url);
    var urls = req.body['urls[]'];
    if (resources[urls])
        res.send(JSON.stringify({[urls]: resources[urls]}));
    else
        res.send(JSON.stringify({[urls]: {size: 0, peerIds: []}}));
    res.end();
});

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const wsServer = new WebSocketServer({
    httpServer: wsserver,
    clientTracking: true
}, () => console.log((new Date()) + 'Web Socket Server is listening on port ' + wsport));

wsServer.on('request', function (ws, request) {
    console.log((new Date()) + ' Connection from origin ' + ws.origin + '.');
    var connection = ws.accept(null, ws.origin);
    console.log((new Date()) + ' Connection accepted.');

    //Generate a Random TrackerServer-Client PeerID
    const peerId = PeerIdGenerator();
    console.log("PeerId : " + peerId);
    connection.id = peerId;
    connection.sendUTF(JSON.stringify({type: "set_peer_id", data: {id: peerId}}));
    //connection.sendUTF(JSON.stringify({type : "rpc", data:{rpcId: peerId, data: 3123123123}}));

    connection.on('message', function (message) {

        ///console.log(message);
        //Handle Types of Messages
        var mesg = JSON.parse(message.utf8Data);

        if (mesg.type === "seedOffer") {
            var urls = mesg.data["urls"];
            console.log(mesg);
            if (resources[urls]) {
                resources[urls].peerIds.push(peerId);
                resources[urls].size = mesg.data.size;
            } else {
                resources[urls] = {
                    size: mesg.data.size,
                    peerIds: [peerId],
                };
            }
        }
        console.log(resources);

        if (mesg.type === "iceCandidate") {
            wsServer.broadcast(JSON.stringify(mesg));
            console.log("------------iceCandidate---------------");
            console.log(mesg.data.to);
            console.log(peerId);
            console.log(mesg.from);
            console.log("---------------------------");
        }

        if (mesg.type === "connectionOffer") {
            wsServer.connections.forEach(function (connection) {
                if (connection.id === mesg.data.to) {
                    connection.sendUTF(JSON.stringify(mesg));
                }
            });
            console.log("-----------connectionOffer----------------");
            console.log(mesg.data.to);
            console.log(peerId);
            console.log(mesg.from);
            console.log("---------------------------");
        }

        if (mesg.type === "connectionAnswer") {
            //wsServer.broadcast(JSON.stringify(mesg));
            wsServer.connections.forEach(function (connection) {
                if (connection.id === mesg.data.to) {
                    connection.sendUTF(JSON.stringify(mesg));
                }
            });
            console.log("-----------connectionAnswer----------------");
            console.log(mesg.data.to);
            console.log(peerId);
            console.log(mesg.from);
            console.log("---------------------------");
        }

        /*if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }*/
    });

    connection.on('close', function (connection) {
        console.log("------------ Closed ID : " + peerId + "  ---" + (new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
        //Clean PeerID
        //Remove Seeds Attached to this peerId.
        for (urls in resources) {
            resources[urls].peerIds.pop(peerId);
        }
    });
});