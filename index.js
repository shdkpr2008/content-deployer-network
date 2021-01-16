// Importing Required NodeJs Modules
const http = require('http'); //HTTP Module
const sha1 = require('sha1'); //SHA1 Module
const WebSocketServer = require('websocket').server; //WebSocketServer Module
const express = require('express'); //Express Module
const bodyParser = require("body-parser"); //bodyParser Module
const path = require('path'); //Path Module
const mongoose = require('mongoose'); //Mongoose Module

// Application: Express Object Initialization
const sapp = express();
const app = express();

/**
 * Configurations
 */
const dbServer = "localhost"; //MongoDB Server Address
const dbDataBase = "dcdn"; //MongoDB Database Name
const dbCredential = ""; //MongoDB Database Credentials eg. Username@Password
const wsport = process.env.MWSPORT || 8181; //Master WebSocket Server Port
const xport = process.env.MSPORT || 80; //Master Server Port

//Start Master Websocket Server and Master Server
const wsserver = sapp.listen(wsport, console.log('[+]' + (new Date()) + ' Master WebSocket Server is listening on port ' + wsport));
const xserver = app.listen(xport, console.log('[+]' + (new Date()) + ' Master Server is listening on port ' + xport));

//RunTime Configurations
wsserver.timeout = 1000 * 60 * 1; // 1 minutes //Master WebSocket Server Connection Timeout
xserver.timeout = 1000 * 60 * 1; // 1 minutes //Master Server Connection Timeout

/**
 * Mongoose DataBase Server Connection Establishment
 */
//Set up default mongoose connection
var mongoDB = 'mongodb://' + dbCredential + dbServer + '/' + dbDataBase;
mongoose.connect(mongoDB, {useNewUrlParser: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, '[-]' + (new Date()) + ' MongoDB connection error:'));
db.on('open', (ref) => {
    console.log('[+]' + (new Date()) + ' Conneced to MongoDB Server');
});


/**
 * Loading Models and Schemas
 */
var Site = require('./models/site.js');
var Log = require('./models/log.js');
var Content = require('./models/Content.js');

/**
 * Peer Configuration Block Size Generator
 */
var blockConfig = { //Default Block Configurations KB,MB,GB...
    kiloByte: 1E3,
    megaByte: 1E6,
    gigaByte: 1E9,
    //Block Size Generator
    getBytes: function (size) {
        return size < 2 * blockConfig.megaByte ? 25 * blockConfig.kiloByte :
            size < 20 * blockConfig.megaByte ? 50 * blockConfig.kiloByte :
                size < 100 * blockConfig.megaByte ? 100 * blockConfig.kiloByte :
                    size < 350 * blockConfig.megaByte ? 250 * blockConfig.kiloByte :
                        size < 500 * blockConfig.megaByte ? 500 * blockConfig.kiloByte :
                            size < 1 * blockConfig.gigaByte ? 1 * blockConfig.megaByte : 2 * blockConfig.megaByte;
    }
};

/**
 * Helper function to generate a unique peer id.
 */
PeerIdGenerator = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
        var b = 16 * Math.random() | 0;
        return ("x" === a ? b : b & 3 | 8).toString(16);
    });
};


/**
 * Set Express Application to use middleware function to set the default Content-Type
 */
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


//Set Express Application to use bodyParser to both Master WebSocket Server and Master Server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

sapp.use(bodyParser.urlencoded({extended: false}));
sapp.use(bodyParser.json());

//Set Express Application to use static folder
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Client Website Example
 */

//Client WebSite Example
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

/**
 * Console and Dialog functionality of master node.
 * These enables to view progress and debug verbose outputs.
 */

//ConsoleBox
app.get('/console', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/console.html'));
});

//DialogBox
app.get('/dialog', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/dialog.html'));
});


/**
 * isEnabled functionality of master node.
 * This checks whether current domain is allowed to use dcdn.
 */
sapp.post('/isEnabled', async (req, res) => {
    res.set({'Content-Type': 'application/json'});
    console.log('[+]' + (new Date()) + ' Received request for ' + req.url);
    var site = await Site.findOne({'address': req.body.isEnabled});
    var isEnabled = false;
    if (site) {
        isEnabled = true;
    }
    res.send(JSON.stringify({'isEnabled': isEnabled}));
});

/**
 * Logging functionality of master node.
 */
app.post('/log', (req, res) => {
    console.log('[+]' + (new Date()) + ' Received request for ' + req.url);
    var log = JSON.parse(req.body.log);

    if (log.type === "resource" && log.resource.fallback === false) {
        var query = {address: host(log.resource.url)},
            update = {expire: new Date(), '$inc': {'bandwidth': log.resource.size}};
        options = {upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false};

        Site.findOneAndUpdate(query, update, options, (error, res2) => {
            if (error) {
                console.log("[-] Caught an error : " + error);
            }
        });
    }

    var logDB = new Log(log);
    logDB.save();
    res.send(JSON.stringify({'success': true}));
    res.end();
});

/**
 * Search response functionality of master node.
 */
sapp.post('/search', (req, res) => {
    res.set({'Content-Type': 'application/json'});
    console.log('[+]' + (new Date()) + ' Received request for ' + req.url);
    var urls = req.body['urls[]'];
    var r = {};

    //Single URL
    if ("string" === typeof (urls)) {
        Content.findOne({'url': urls}, 'peerIds hashes size', function (err, result) {
            r[urls] = {size: 0, peerIds: [], hashes: []}
            if (err) {
                console.log("[-] Caught an error");
            } else if (result !== null) {
                r[urls] = result;
            }
            res.send(JSON.stringify(r));
            res.end();
        });
    } else {//Array of URL
        Content.find({'url': {'$in': urls}}, 'peerIds hashes size url', function (err, result) {
            for (var url in urls) {
                r[urls[url]] = {size: 0, peerIds: []};
            }
            if (err) {
                console.log("[-] Caught an error");
            } else {
                for (var i = 0; i < result.length; i++) {
                    r[result[i].url] = result[i];
                }
            }
            res.send(JSON.stringify(r));
            res.end();
        });
    }
});

/**
 * Helper funtion to compute hostname from url
 *
 */
function host(url) {
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}

/**
 * Helper function for seed call from Asynchronous seedOffer function
 */
function seed(url, peerId, size, hashes) {
    var query = {'url': url},
        update = {expire: new Date(), "$addToSet": {"peerIds": peerId}},
        options = {upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false};
    if (size !== undefined || size != null) {
        update['size'] = size;
        update['hashes'] = hashes;
    }

    // Find the content or create if not exists
    // Increment Number of Peer
    Content.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) {
            console.log("[-] Caught an error : " + error);
        }
        Site.findOneAndUpdate({address: host(result.url)}, {'$inc': {'peers': 1}}, options, (error, res2) => {
            if (error) {
                console.log("[-] Caught an error : " + error);
            }
        });
    });
}

/**
 * Asynchronous Helper function for seedOffer call from websocket seedOffer http module call
 */
async function seedOffer(peerId, url, res) {
    var size = 0;
    size = res.headers['content-length'];
    let chunks = [];
    let found = false;

    //Find if content is already in database of same size and url
    await Content.findOne({'url': url}, (err, result) => {
        if (result) {
            if (size === result.size) {
                found = true;
            }
        }
    });

    //if found then append current peerId to the content
    if (found) {
        seed(url, peerId);
    }

    //if not found then download original content
    if (!found) {
        res.on('data', function (chunk) {
            chunks.push(Buffer.from(chunk, 'binary'));
        });
    }

    //if not found then sha1 each block and save content with size and hashes
    if (!found) {
        res.on("end", function () {
            let data = Buffer.concat(chunks);
            var bsize = blockConfig.getBytes(size)
            var hashes = [];
            var i = 0;
            while (i < size) {
                hashes.push(sha1(data.slice(i, i += bsize)));
            }
            seed(url, peerId, size, hashes);
        });
    }
    //console http error
    res.on("error", function (e) {
        console.log("Error: " + e.message);
    });
}

/**
 * WebSocket for Signaling - Master Node Tracker Implementation
 * Handles set_peer_id, seedOffer, iceCandidate, connectionOffer and connectionAnswer
 */
const wsServer = new WebSocketServer({
    httpServer: wsserver,
    clientTracking: true
});

//On Master WebSocket Connection Request
wsServer.on('request', function (ws, request) {
    console.log('[+]' + (new Date()) + 'Master WebSocket Connection from origin ' + ws.origin + '.');
    var connection = ws.accept(null, ws.origin); //Accept the connection request.
    console.log('[+]' + (new Date()) + 'Master WebSocket Connection accepted.');

    //Generate a Random TrackerServer-Client PeerID
    const peerId = PeerIdGenerator();
    connection.id = peerId;
    connection.sendUTF(JSON.stringify({type: "set_peer_id", data: {id: peerId}}));
    console.log("------------set_peer_id---------------")
    console.log(peerId)
    console.log("---------------------------")

    //Handle WebSocket Server Messages
    connection.on('message', function (message) {

        //Parse Message
        var mesg = JSON.parse(message.utf8Data);

        //Handle seedOffer Message
        if (mesg.type === "seedOffer") {
            urls = mesg.data["urls"];
            for (url in urls) {
                var httpReq = seedOffer.bind(null, peerId, urls[url]);
                http.get(urls[url], httpReq);
            }
            console.log("------------seedOffer---------------");
            console.log(peerId);
            console.log(urls);
            console.log("---------------------------");
        }

        //Signal iceCandidate Message
        if (mesg.type === "iceCandidate" && mesg.data.candidate !== null && mesg.data.to !== null && mesg.from !== null && mesg.data.to !== mesg.from) {
            wsServer.connections.forEach(function (connection) {
                if (connection.id === mesg.data.to) {
                    connection.sendUTF(JSON.stringify(mesg));
                }
            });
            //wsServer.broadcast(JSON.stringify(mesg));
            console.log("------------iceCandidate---------------");
            console.log(mesg.data.to);
            console.log(peerId);
            console.log(mesg.from);
            console.log("---------------------------");
        }

        //Signal connectionOffer Message
        if (mesg.type === "connectionOffer" && mesg.data.to !== mesg.from) {
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

        //Signal connectionAnswer Message
        if (mesg.type === "connectionAnswer" && mesg.data.to !== mesg.from) {
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
    });

    //Handle WebSocket Server Closing
    connection.on('close', function (connection) {
        console.log("------------ Closed ID : " + peerId + "  -------");
        console.log('[+]' + (new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
        //Clean PeerID
        //Remove Seeds Attached to this peerId.
        //Decrement Number of Peer
        var query = {peerIds: peerId},
            update = {$pull: {'peerIds': peerId}},
            options = {multi: true, useFindAndModify: false};
        Content.find(query, function (error, result) {
            if (error) {
                console.log("[-] Caught an error : " + error);
            }
            for (var i = 0; i < result.length; i++)
                Site.updateMany({'address': host(result[i].url)}, {'$inc': {'peers': -1}}, options, (error, res2) => {
                    if (error) {
                        console.log("[-] Caught an error : " + error);
                    }
                });
            Content.updateMany(query, update, options, function (error, result) {
                if (error) {
                    console.log("[-] Caught an error : " + error);
                }
            });
        });
    });
});

/**
 * Termination Handling
 * Clean the Master Node Content database on clean shutdown.
 * Clean number of peers
 */
process.on('SIGINT', function () {
    console.log('[!]' + (new Date()) + "Caught interrupt signal, Shutting Down ....");
    Content.deleteMany({}, (err, res) => {
        console.log('[+]' + (new Date()), err, res)
        Site.updateMany({}, {'$set': {'peers': 0}}, (error, res2) => {
            console.log('[+]' + (new Date()), error, res2);
            process.exit();
        });
    })
});