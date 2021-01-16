/* dCDN Library
  a1ph@
*/
(function () {
    'use strict'; //Be strict and everything should be defined for to be resolved.
    //Secure++

    //Empty function return function
    function e() {
        return function () {
        };
    }

    //Initialzie Browser Support For Required WebRTC Elemets
    var g, l = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
        aa = window.mozRTCSessionDescription || window.RTCSessionDescription,
        ba = window.mozRTCIceCandidate || window.RTCIceCandidate;

    //Worker Block Configuration (Node Utilities)
    var m = {
        //Bits Manupulation Parameters
        o: 1E3,
        d: 1E6,
        T: 1E9,
        qa: 1E12,
        //Calculate Length of Block 
        Sa: function (a) {
            return a < 2 * m.d ? 25 * m.o : a < 20 * m.d ? 50 * m.o : a < 100 * m.d ? 100 * m.o : a < 350 * m.d ? 250 * m.o : a < 500 * m.d ? 500 * m.o : a < 1 * m.T ? 1 * m.d : 2 * m.d
        },
        //Expand with other Configurations //Inheritance
        extend: function (a) {
            Array.prototype.slice.call(arguments, 1).forEach(function (b) {
                for (var c in b) void 0 !== b[c] && (a[c] = b[c])
            });
            return a;
        },
        values: function (a) {
            var b = [],
                c;
            for (c in a) a.hasOwnProperty(c) && b.push(a[c]);
            return b;
        },
        //Random Block
        random: function (a, b) {
            null == b && (b = a, a = 0);
            return a + Math.floor(Math.random() * (b - a + 1))
        },

        //Statistics 
        qb: function (a) {
            return a < m.o ? a + " bytes" :
                a < m.d ? (a / m.o).toFixed(1) + " KB" : a < m.T ? (a / m.d).toFixed(1) + " MB" : a < m.qa ? (a / m.T).toFixed(1) + " GB" : (a / m.qa).toFixed(1) + " TB"
        }
    };

    //Scrape
    "undefined" !== typeof module && (module.exports = m, m.extend(m, require("./util-node")));
    "undefined" !== typeof module && (module.exports = n, require("./util").extend(n, require("./config-node")));
    "undefined" !== typeof module && "exports" in module && (module.exports = v);
    "undefined" !== typeof module && (module.exports = u);

    //Regex for format URL and URI
    var ca = /\/([^\/]+)\/?$/,
        da = /(.+?:\/\/[^\/]+)\/?/;

    //Random string generator to be used as peerId and workerId
    m.na = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 16 * Math.random() | 0;
            return ("x" === a ? b : b & 3 | 8).toString(16)
        });
    };
    //Current Date Function
    m.now = function () {
        return window.performance ? window.performance.now() : Date.now ? Date.now() : +new Date;
    };

    //Create a new a element and links to parameter a
    m.la = function (a) {
        var b = document.createElement("a");
        b.href = a;
        return b.href;
    };

    //Format URL
    m.Ya = function (a) {
        da.exec(a);
    };

    //Create a new style element and links to parameter a
    m.sb = function (a) {
        var b = document.createElement("style");
        b.innerHTML = a;
        document.getElementsByTagName("head")[0].appendChild(b);
    };

    //Create a new script element and links to parameter a and b(onload)
    m.rb = function (a, b) {
        var c = document.createElement("script");
        c.setAttribute("src", a);
        c.onload = b;
        document.getElementsByTagName("head")[0].appendChild(c);
    };

    //Create a new div element and append innerHTML of parameter a
    m.wa = function (a) {
        var b = document.createDocumentFragment(),
            c = document.createElement("div");
        for (c.innerHTML = a; c.firstChild;) b.appendChild(c.firstChild);
        document.body.insertBefore(b, document.body.childNodes[0]);
    };

    //ReConstruct Base64 of block from binary to string
    m.Na = function (a) {
        for (var b = "", c = 0; c < a.byteLength; c++) b += String.fromCharCode(a[c]);
        return btoa(b);
    };

    //ReConstruct ArrayBuffer of Uint8Array from of Base64 parameter a
    m.pb = function (a) {
        a = atob(a);
        for (var b = new ArrayBuffer(a.length), b = new Uint8Array(b), c = 0, d = a.length; c < d; c++)
            b[c] = a.charCodeAt(c);
        return b;
    };

    //Format URL from URI
    m.Ma = function (a) {
        return ca.exec(m.la(a))[1]
    };

    //Handle File Click Events
    m.click = function (a) {
        if (document.createEvent) {
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", true, true);
            a.dispatchEvent(b)
        } else if (document.createEventObject) a.fireEvent("onclick");
        else if ("function" === typeof a.onclick) a.onclick(null);
        else a.click();
    };

    //Process before DOM loading and statechanges 
    m.U = function () {
        function a() {
            var a;
            for (p = 1; a = c.shift();) a();
        }

        var b, c = [],
            d, f = document,
            h = f.documentElement,
            k = h.doScroll,
            p = /^loade|c/.test(f.readyState);
        f.addEventListener && f.addEventListener("DOMContentLoaded", d = function () {
            f.removeEventListener("DOMContentLoaded", d, false);
            a();
        }, false);
        k && f.attachEvent("onreadystatechange", d = function () {
            /^c/.test(f.readyState) && (f.detachEvent("onreadystatechange", d), a());
        });
        return b = k ? function (a) {
            self != top ? p ? a() : c.push(a) : function () {
                try {
                    h.doScroll("left")
                } catch (c) {
                    return setTimeout(function () {
                            b(a)
                        },
                        50)
                }
                a()
            }()
        } : function (a) {
            p ? a() : c.push(a)
        }
    }();

    //Event Attacher
    m.C = function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, false) : a.attachEvent ? a.attachEvent("on" + b, c) : (b = "on" + b, "function" === typeof a[b] && (c = function (a, b) {
            return function () {
                a.apply(this, arguments);
                b.apply(this, arguments)
            }
        }(a[b], c)), a[b] = c)
    };

    //Event Configurations (Node Configurations)
    var n = {}; //Empty Set

    n.id = m.na(); //peerId
    n.isEnabled = false;
    n.build = 1011; //ScriptBuildNumber
    n.debug = window.localStorage && window.localStorage["dcdn-debug"]; //isDebugEnabled from cookie?

    n.trackerDomain = "localhost:8181"; //MasterNode i.e. TrackerDomain
    n.loggerDomain = "localhost"; //Doamin for logging statitstics
    n.toolsDomain = "localhost"; //Tools domain for console and debug dialog

    n.economyMode = true; //isEconomical to enable?  
    n.lazyLoad = true; //LazyLoad of images and videos on scroll
    n.lazyLoadThreshold = 1500; //ThreshHold of Lazy Load

    n.F = !!navigator.webkitGetUserMedia || !!navigator.mozGetUserMedia; //isMediaSupportAvaiable?
    n.G = {audio: true, video: true}; //Options

    n.R = 5; //Number of Worker Nodes

    n.Da = { //Ice Resolution Servers
        iceServers: [{
            url: n.F ? "stun:stun1.l.google.com:19302" : "stun:stun.l.google.com:19302"
        }]
    };
    n.za = { ////Check according to Media support, DataChannel Type
        optional: n.F ? [] : [{
            RtpDataChannels: true
        }]
    };

    n.ya = {}; //Store Created Connection Offers and Connection Answers

    n.Qa = n.F ? { //Check according to Media support, DataChannel Options
        outOfOrderAllowed: true, //UDP ? TCP {}
        ordered: false,
        maxRetransmitNum: 0
    } : {
        reliable: false
    };


    n.D = 800; //ArraySize for block buffer
    n.kb = 0.6; //MinimumRatio between blocks and pieces 

    n.Va = 250; //Starting Block Count
    n.k = 500; //Ending Block Count

    n.nb = 1E3; //Tracker Search Timeout
    n.lb = 1E3; //Block Download Timeout
    n.Oa = 1E3; //Timeout before closing DataChannel

    n.$a = 150 * m.o; //Minimum Speed Check
    n.Ba = 1E3; //Interval for Speed Check
    n.ob = 2E3; //Time to bind to Speed Check

    n.ub = 10;
    n.tb = 100 * m.d;

    n.Za = n.F ? 800 * m.d : 400 * m.d; //Type File Size Limit depending upon DataChannel Type

    n.mb = 1E4; //RevokeObjectURL Timeout ie. replace original url in case of fallback and successfull loading

    //Handle windowed dCDN Object on Reload 
    if (window.dCDN) {
        for (var q in window.dCDN)
            q in n && (n[q] = window.dCDN[q]);
    }

    //Console Log Error Stack Unwind
    function ea() {
        var a = Error().stack;
        a && (n.F ? console.log("    at " + a.match(/^(.*?\n){2}(.*?)(\n|$)/i)[2]) : console.log(a.match(/^(.*?\n){3}(.*?)(\n|$)/i)[2]))
    }

    //Console Log Warning and Error Function
    function r() {
    }

    //Console Log Warning Function
    r.warn = function () {
        try {
            if (n.debug) {
                var a = Array.prototype.slice.call(arguments);
                a.unshift("[dCDN]");
                console.log.apply(console, a)
            }
        } catch (b) {
        }
    };
    //Console Log Error Function
    r.error = function () {
        try {
            var a = Array.prototype.slice.call(arguments),
                a = a.map(function (a) {
                    return a.message || a
                });
            "undefined" !== typeof t && t.G && t.G.N.push("ERROR: " + a.join(" | "));
            n.debug && (a.unshift("[dCDN]"), console.error.apply(console, a), ea())
        } catch (b) {
        }
    };

    //Empty Buffer element fa
    var fa = "undefined" !== typeof Buffer ? Buffer : "undefined" !== typeof Int8Array ? Int8Array : function (a) {
        for (var b = Array(a), c = 0; c < a; c++) b[c] = 0
    };

    //Buffer Instance of size a
    function u(a) {
        if (!(this instanceof u)) return new u(a);
        "number" === typeof a && (0 !== a % 8 && (a += 8), a = new fa(a >> 3), a.fill && a.fill(0));
        this.buffer = a
    }

    //Buffer Getter
    u.prototype.get = function (a) {
        return !!(this.buffer[a >> 3] & 128 >> a % 8)
    };
    //Buffer Setter
    u.prototype.set = function (a, b) {
        this.buffer[a >> 3] = b || 1 === arguments.length ? this.buffer[a >> 3] | 128 >> a % 8 : this.buffer[a >> 3] & ~(128 >> a % 8)
    };


    //Extra Functions Functionality Prototypes
    function v() {
    }

    v.prototype.on = function (a, b) {
        this.a = this.a || {};
        this.a[a] = this.a[a] || [];
        this.a[a].push({
            fn: b,
            once: false
        });
        return this
    };
    v.prototype.once = function (a, b) {
        this.a = this.a || {};
        this.a[a] = this.a[a] || [];
        this.a[a].push({
            fn: b,
            once: true
        });
        return this
    };
    v.prototype.off = function (a, b) {
        var c = this;
        c.a = c.a || {};
        if (false !== a in c.a) return c.a[a].map(function (d, f) {
            d.fn === b && c.a[a].splice(f, 1)
        }), this
    };
    v.prototype.emit = function (a) {
        this.a = this.a || {};
        var b = Array.prototype.slice.call(arguments, 1);
        if (false !== a in this.a)
            for (var c = 0, d = this.a[a].length; c < d; c++) {
                var f = this.a[a][c];
                f.fn.apply(this, b);
                f.once && this.off(a, f.fn)
            }
    };

    //Set Extra Functionalities to Objects
    function w(a) {
        for (var b = ["on", "once", "off", "emit"], c = 0; c < b.length; c++) a.prototype[b[c]] = v.prototype[b[c]]
    }

    //Filler and Attach Extra Functionalities to be used in XHR
    function x() {
    }

    w(x);

    //XHR Function For Other Quiries
    function y(a, b) {
        var c = new x,
            d = new XMLHttpRequest;
        d.open("POST", a);
        d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //On Load, if not 200 ->error raised
        d.addEventListener("load", function () {
            200 === d.status ? c.emit("load", d.response) : c.emit("error", Error("XHR bad status: " + d.status))
        }, false);

        //On Error
        d.addEventListener("error", function () {
            c.emit("error", Error("XHR error (post)"))
        }, false);

        //Serialize HTTP POST data b
        var f = ha(b);
        d.send(f);
        return c
    }

    //XHR Function To Load Contents (First Timer)
    function ia(a) {

        //On Error
        function b() {
            h.emit("error", Error("XHR error (getBinary)"))
        }

        //On Load
        function c() {
            304 === k.status || k.status === (p ? 206 : 200) ? h.emit("load", k.response, {
                size: k.response.byteLength,
                mimeType: k.getResponseHeader("Content-Type")
            }) : h.emit("error", Error("XHR bad status: " + k.status));
            k.removeEventListener("load", c, false);
            k.removeEventListener("error", b, false);
            k.removeEventListener("progress", d, false);
            k = null
        }

        //On Progress
        function d(a) {
            a.lengthComputable ? h.emit("progress", a.loaded, a.total) : k.removeEventListener("progress", d, false)
        }

        //Initilize and Attach
        var f, h = new x,
            k = new XMLHttpRequest;
        f = f || {};
        k.open("GET", a);
        var p = null != f.Ca && null != f.ab;
        p && k.setRequestHeader("Range", "bytes=" + f.Ca + "-" + (f.Ca + f.ab - 1));
        k.responseType = "arraybuffer";
        k.addEventListener("load", c, false);
        k.addEventListener("progress", d, false);
        k.addEventListener("error", b, false);
        k.send();
        return h
    }

    //Serialize and Encode data URI
    function ha(a) {
        function b(a, b) {
            c.push(encodeURIComponent(a) + "=" + encodeURIComponent(null == b ? "" : b))
        }

        var c = [],
            d;
        for (d in a) ja(d, a[d], b);
        return c.join("&").replace(/%20/g, "+")
    }

    //Helper Function to Serialize and Encode data URI
    var ja = function z(b, c, d) {
        if (Array.isArray(c)) c.forEach(function (c, f) {
            z(b + "[" + ("object" === typeof c ? f : "") + "]", c, d)
        });
        else if ("object" === typeof c)
            for (var f in c) z(b + "[" + f + "]", c[f], d);
        else d(b, c.toString())
    };

    //Resource Block Structure 
    function A(a, b, c) {
        this.b = a;  //Element Selector Type
        this.id = b; //Block ID
        this.size = c || this.b.m; //Resoruce Size
        this.oa = false; //Is Loaded?
        this.g = Math.ceil(this.size / n.D); //Number of Blocks
        this.h = 0; //Initialized Blockes
        this.L = new Uint8Array(this.b.data.buffer, this.id * this.b.m, this.size); //Data Array
        this.q = new u(this.g); //Buffer Instance
        this.f = new u(this.g); //Buffer Instance
    }

    w(A); //Attach Extra Functionalities

    //Resource Block Getter
    A.prototype.get = function () {
        return this.L
    };

    //Resource Block Setter
    A.prototype.set = function (a) {
        this.L.set(a);
        B(this);
        this.emit("complete", this)
    };

    //Helper Function to Resoruce Block Setter
    function B(a) {
        a.h = a.g;
        for (var b = 0; b < a.g; b++) a.f.set(b, 1);
        a.q = new u(a.g)
    }

    //Resoruce Block Re-Setter 
    A.prototype.reset = function () {
        this.h = 0;
        this.q = new u(this.g);
        this.f = new u(this.g);
        this.emit("reset", this)
    };

    //Dialog Box For Status
    function C(a) {
        this.b = a;
        var iFrame = '<iframe id="dcdn-dialog" src="//' + n.toolsDomain + '/dialog" style="border: 0;height: 1%;left: 0;position: fixed;top: 0;width: 1%;"></iframe>';
        m.wa(iFrame);
        this.aa = document.getElementById("dcdn-dialog").contentWindow;
        window.addEventListener("message", function (a) {
            "close" === a.data.type && D()
        }, false);
        this.b.on("downloadprogress", this.Ga.bind(this));
        this.b.on("loaded", this.Ia.bind(this));
        this.b.on("seedprogress", this.La.bind(this))
    }

    C.prototype.Ga = function (a, b) {
        this.aa.postMessage({
            type: "downloadprogress",
            xhrLoaded: a,
            xhrTotal: b,
            numPeers: this.b.peers.length,
            downloadedSize: E(this.b),
            resourceSize: this.b.size
        }, "*")
    };
    C.prototype.Ia = function () {
        1 === this.b.status ? D() : this.aa.postMessage({
            type: "loaded",
            fileName: this.b.fileName
        }, "*")
    };
    C.prototype.La = function () {
        this.aa.postMessage({
            type: "seedprogress",
            numPeers: this.b.peers.length,
            uploadedBytes: this.b.ma
        }, "*")
    };

    //Disable Dialog Box 
    function D() {
        var a = document.getElementById("dcdn-dialog");
        a && a.parentElement.removeChild(a)
    }

    /*
     Copyright (c) 2012 T. Michael Keesey
     LICENSE: http://opensource.org/licenses/MIT
     See: https://bitbucket.org/keesey/sha1/overview
 
    /*
     Copyright (c) Instant IO, Inc.
     A Big Thanks to Feross Aboukhadijeh, Abi Raja, and John Hiesey.
    */

    //Worker Pool
    function F() {
        this.I = 0; //WorkerPicker
        this.Ea = []; //Array Store Workers
        this.n = {}; //Store Chunk
        this.j() //WorkerCall
    }

    F.prototype.j = function () {
        if (0 !== n.R)
            for (var a = window.URL.createObjectURL(new Blob(['var w;(function(d){function k(c){for(var a="",q,e=7;0<=e;--e)q=c>>>(e<<2)&15,a+=q.toString(16);return a}function y(c){c=c.replace(/[\u0080-\u07ff]/g,function(a){a=a.charCodeAt(0);return String.fromCharCode(192|a>>6,128|a&63)});c=c.replace(/[\u0080-\uffff]/g,function(a){a=a.charCodeAt(0);return String.fromCharCode(224|a>>12,128|a>>6&63,128|a&63)});for(var a=c.length,q=new Uint8Array(a),e=0;e<a;++e)q[e]=c.charCodeAt(e);return q.buffer}var n=Math.pow(2,24),z=Math.pow(2,32),A=function(){function c(a){this.a=new Uint8Array(a<<2)}c.prototype.get=function(a){a<<=2;return this.a[a]*n+(this.a[a+1]<<16|this.a[a+2]<<8|this.a[a+3])};c.prototype.set=function(a,c){var e=Math.floor(c/n),d=c-e*n;a<<=2;this.a[a]=e;this.a[a+1]=d>>16;this.a[a+2]=d>>8&255;this.a[a+3]=d&255};return c}();d.hash=function(c){var a;a=c instanceof ArrayBuffer?c:y(String(c));c=1732584193;var d=4023233417,e=2562383102,s=271733878,t=3285377520,b=a.byteLength,l=b<<3,u=Math.ceil((l+65)/512)<<9>>>3>>>2,v=new A(u),f=v.a,g=new Uint32Array(80),h=new Uint8Array(a);for(a=0;a<b;++a)f[a]=h[a];f[b]=128;v.set(u-2,Math.floor(l/z));v.set(u-1,l&4294967295);for(a=0;a<u;a+=16){for(b=0;16>b;++b)g[b]=v.get(a+b);for(;80>b;++b)g[b]=(g[b-3]^g[b-8]^g[b-14]^g[b-16])<<1|(g[b-3]^g[b-8]^g[b-14]^g[b-16])>>>31;for(var l=c,f=d,h=e,m=s,n=t,p,r,b=0;80>b;++b)20>b?(p=f&h|~f&m,r=1518500249):40>b?(p=f^h^m,r=1859775393):60>b?(p=f&h^f&m^h&m,r=2400959708):(p=f^h^m,r=3395469782),p=(l<<5|l>>>27)+p+n+r+g[b]&4294967295,n=m,m=h,h=f<<30|f>>>2,f=l,l=p;c=c+l&4294967295;d=d+f&4294967295;e=e+h&4294967295;s=s+m&4294967295;t=t+n&4294967295}return k(c)+k(d)+k(e)+k(s)+k(t)}})(w||(w={}));var x;self.addEventListener("message",function(d){var k;d=d.data;switch(d.cmd){case "verifyPiece":k={isValid:w.hash(d.buffer)===d.hash};break;case "setWorkerId":x=d.workerId;break;default:postMessage({cmd:"log",msg:"Unkown command "+d.cmd,workerId:x})}k&&postMessage({cmd:"rpc",rpcId:d.rpcId,result:k,workerId:x},void 0)},false);'], {
                    type: "text/javascript"
                })),
                     b = 1; b <= n.R; b++) {
                var c = new Worker(a);
                c.addEventListener("message", this.ib.bind(this), false);
                c.addEventListener("error", this.hb.bind(this), false);
                c.postMessage({
                    cmd: "setWorkerId",
                    workerId: b
                });
                this.Ea.push(c)
            }
    };

    //Verify Block Piece using Wokers from among the WorkerPool
    function ka(a, b, c) {
        var d = t.workerPool;
        if (0 === n.R) c({
            isValid: true
        });
        else {
            var f = d.Ea[d.I],
                h = m.na();
            d.n[h] = c;
            c = a.id * a.b.m;
            a = a.b.data.buffer.slice(c, c + a.size);
            f.postMessage({
                cmd: "verifyPiece",
                rpcId: h,
                buffer: a,
                hash: b
            }, [a]);
            d.I += 1;
            d.I %= n.R
        }
    }

    //Handle Worker Message Event
    F.prototype.ib = function (a) {
        var b = a.data.cmd;
        "rpc" === b ? (this.n[a.data.rpcId] || r.error("Unknown RPC from worker " + a.data.workerId), this.n[a.data.rpcId](a.data.result), delete this.n[a.data.rpcId]) : "log" === b || r.error("Unknown command " + a.data.cmd + " from worker " + a.data.workerId)
    };

    //Handle Worker Error Event
    F.prototype.hb = function (a) {
        r.error("ERROR: Line " + a.lineno + " in " + a.filename + ": " + a.message)
    };

    //Resoruce Array
    function G() {
        this.resources = this.B = {};
        this.da = {}
    }

    //Add a resoruce
    G.prototype.add = function (a) {
        this.B[a.url] = a;
        this.da[a.ca] = a
    };
    //Remove a resoruce
    G.prototype.remove = function (a) {
        var b = this.B[a];
        b && (delete this.da[b.ca], delete this.B[a])
    };
    //Get a resoruce
    G.prototype.get = function (a) {
        return this.B[a]
    };

    //Handle Automation of Sending SeedOffer
    function la() {
        var a = t.A,
            b = Object.keys(a.B),
            b = b.filter(function (b) {
                return 5 === a.B[b].status
            });
        H(b)
    }

    //MasterNode (Tracker) Communication Initialization
    function I() {
        this.pa = "http://" + n.trackerDomain + "/search"; //Search Path
        this.X = null;  //store PeerId Generated from Tracker 
        this.e = false; //isPeerId Generated?
        this.ea = []; //Queue for messages before a connection can be established
        this.n = {}; //RPC Commands Queues sended as json_obj.data
        this.H = { //Singnaling Commands to signal
            set_peer_id: this.gb.bind(this),  //Peer Id
            iceCandidate: this.ja.bind(this),  //IceCandiddate
            connectionOffer: this.ia.bind(this), //Connection Offer
            connectionAnswer: this.ha.bind(this) //Connection Answer
        };
        this.s = false; //isTracker Enabled?
        this.i = {}; //
        this.open() //Open Tracker on Object Creation
    }

    g = I.prototype;
    g.open = function () {
        this.K = new WebSocket("ws://" + n.trackerDomain + "/"); //Websocket Address
        this.startTime = Date.now(); //Start Time
        this.K.addEventListener("open", this.Ka.bind(this), false); //Attach Events
        this.K.addEventListener("close", this.Fa.bind(this), false);
        this.K.addEventListener("message", this.Ja.bind(this), false);
        this.K.addEventListener("error", this.Ha.bind(this), false)
    };

    //on Open Event
    g.Ka = function () {
        ma(t.G, { //Log Tracker Open Time
            "tracker-channel-open": Date.now() - this.startTime
        })
    };

    //on Close Event
    g.Fa = function () {
        this.X = null; //Remove PeerId
        this.e = false; //Reset isInitialized?
        window.setTimeout(this.open.bind(this), 1E3)
    };

    //on Message Event
    g.Ja = function (a) {
        a = JSON.parse(a.data); //Data From Message
        if ("rpc" === a.type) //isRPCType?
            this.n[a.rpcId] || r.error("Unknown RPC ID " + a.rpcId + " from tracker.")
                , this.n[a.rpcId](a.data), delete this.n[a.rpcId];
        else if (this.H[a.type]) this.H[a.type](a); //isPredefinedSingnaling?
        else r.error("Unrecognized `" + a.type + "` message from tracker.")
    };

    //on Error Event
    g.Ha = function (a) {
        r.error("Tracker connection error: " + a.data)
    };

    //Set Peer Tracker Command Handling
    g.gb = function (a) {
        var b = this;
        b.X = a.data.id;  //Set PeerId from JSON Response
        n.id = b.X;
        b.e = true; //Set isInitialized to true
        b.sendMessage("setUserAgent", { //SendMessage on Socket To set UserAgent
            userAgent: -1 !== navigator.userAgent.search("Firefox") ? "Firefox" : "Chrome"
        });
        b.ea.forEach(function (a) { //Process Messages in Queue
            na(b, a)
        });
        b.ea = []; //Empty the queue
        la()
    };

    //IceCandidate Tracker Command Handling
    g.ja = function (a) {
        var b = t.peers[a.from];
        b && b.ja(a.data.candidate)
    };

    //Connection Offer Tracker Command Handling
    g.ia = function (a) {
        (new J(a.from, false)).ia(a.data.offer)
    };

    //Connection Answer Tracker Command Handling
    g.ha = function (a) {
        var b = t.peers[a.from];
        b || r.error("Unexpected `connection_answer` from peer " + a.from + ".");
        b && b.ha(a.data.answer) //If b, serialzie and send data
    };

    //Send Message on WebSocket a being WebSocket Element, b being Message
    function na(a, b) {
        if (a.e) {
            b.from = a.X;
            var c = JSON.stringify(b);
            a.K.send(c)
        } else a.ea.push(b)
    }

    //Send Message Prototype
    g.sendMessage = function (a, b, c) {
        a = {
            type: a,
            data: b
        };
        c && (b = m.na(), a.rpcId = b, this.n[b] = c);
        na(this, a)
    };

    //Seed Offer Function
    function H(a) {
        var c = t.w;
        "string" === typeof a && (a = [a]);
        0 < a.length && c.sendMessage("seedOffer", {
            urls: a
        })
    }

    //Enable Tracker To Begin Working
    function oa(a) {
        a.s || (a.s = true)
    }

    //Search
    function pa(a) {
        if (a.s) {
            var b = Object.keys(a.i);
            if (b.length) y(a.pa, {
                urls: b,
            }).on("load", function (b) {
                b = JSON.parse(b);
                for (var d in b) {
                    var f = b[d];
                    a.i[d].forEach(function (a) {
                        a(null, f)
                    })
                }
                a.i = {};
                a.s = false
            }).on("error", function (b) {
                for (var d in a.i) a.i[d].forEach(function (a) {
                    a(b)
                });
                a.i = {};
                a.s = false
            });
            else a.i = {}, a.s = false
        }
    }

    //Search Query Formater
    // a : Tracker Object
    // b: urls
    // c : search failed callback
    function qa(a, b, c) {
        if (a.s) a.i[b] ? a.i[b].push(c) : a.i[b] = [c];
        else y(a.pa, {
            urls: [b],
        }).on("load", function (a) {
            a = JSON.parse(a)[b];
            c(null, a)
        }).on("error", c)
    };

    //Establish RTC Connections, a being peerId and b being true for data from peer, false for local
    function J(a, b) {
        this.p = a; //PeerId
        this.Xa = b; //isFromPeer or Local?
        this.r = null; //DataChannel Object
        this.e = false; //is Data Channel Open?
        this.J = []; //Resource Queue to be processed
        this.l = 0;  //Block
        this.k = n.Va; //Block
        this.V = null; //Block
        this.M = 0; //Block
        this.H = { //DataChannel Messages Types
            request: this.fb.bind(this),
            block: this.bb.bind(this),
            close: this.close.bind(this)
        };
        if (this.p in t.peers) return t.peers[this.p];
        this.j() //Main Function
    }

    g = J.prototype;
    g.j = function () {
        var a = this;
        try {
            a.c = new l(n.Da, n.za) //Create RTCPeerConnection
        } catch (b) {
            r.error("Failed to create RTCPeerConnection.", b);
            return
        }
        t.peers[a.p] = a;
        var c = "onsignalingstatechange";
        try {
            "undefined" !== typeof a.c.wb && (c = "onstatechange") //Handle Signaling State Change
        } catch (d) {
        }
        var f = "oniceconnectionstatechange";
        try {
            "undefined" !== typeof a.c.vb && (f = "onicechange") //Handle Ice Connection State Change
        } catch (h) {
        }

        //Found an IceCandidate, send infomation on channel to requested peer
        a.c.onicecandidate = function (b) {
            t.w.sendMessage("iceCandidate", {
                candidate: b.candidate,
                to: a.p
            })
        };
        a.c[c] = e();
        //Handle iceConnection Closure
        a.c[f] = function (b) {
            "disconnected" === ("string" === typeof b ? b : b.target.iceConnectionState) &&
            a.close()
        };
        //
        if (a.Xa) { //Is From peer? 
            try {
                a.r = a.c.createDataChannel("dCDN-" + m.na(), n.Qa) //Create a randomId DataChannel and options
            } catch (k) {
                r.error("Failed to create DataChannel.");
                r.error(k);
                return
            }
            ra(a); //Attach onMessage Event Handler to DataChannel
            a.r.onopen = function () { //on DataChannel Open
                a.e = true; //Set DataChannel Opened!
                sa(a) //Process 
            };
            ta(a) //Create Offer
        } else {
            a.c.ondatachannel = function (b) {
                a.r = b.channel; //Wait for seeding request and datachannel
                ra(a); //Attach onMessage Event Handler to DataChannel
                a.r.onopen = function () {
                    a.e = true
                    //Set DataChannel Opened!
                }
            }
        }
    };

    function ra(a) { //DataChannel onMessage Event Handler
        a.r.onmessage = function (b) {
            var c;
            if ("string" === typeof b.data) {
                try {
                    c = JSON.parse(b.data)
                } catch (d) {
                    r.error("Failed to convert string DataChannel message to JSON.");
                    return
                }
                if (null == c.type) r.error("Discarding message with missing `type`.");
                else if (c.from = a.p, a.H[c.type]) a.H[c.type](c);
                else r.error("Unrecognized `" + c.type + "` message from peer.")
            } else r.error("Cannot parse DataChannel message of type " + typeof b.data + ".")
        }
    }

    //Bandwidth Hack ..No Longer..
    function ua(a) {
        var b = a.split("b=AS:30");
        return 1 < b.length ? b[0] + "b=AS:30" + b[1] : a
    }

    //Create Connection Offer
    function ta(a) {
        a.c.createOffer(function (b) {
            b.sdp = ua(b.sdp);
            a.c.setLocalDescription(b, e(), function (a) {
                r.error("setLocalDescription failed", a)
            });
            t.w.sendMessage("connectionOffer", {
                offer: b,
                to: a.p
            })
        }, function (a) {
            r.error("createOffer failed", a)
        }, n.ya)
    }

    //setRemoteDescription for Local
    g.setRemoteDescription = function (a) {
        a = new aa(a);
        this.c.setRemoteDescription(a, e(), function (a) {
            r.error("setRemoteDescription failed", a)
        })
    };

    //setRemoteDescription for remote
    g.ia = function (a) {
        this.setRemoteDescription(a);
        va(this)
    };

    //Create connectionAnswer
    function va(a) {
        a.c.createAnswer(function (b) {
            b.sdp = ua(b.sdp);
            a.c.setLocalDescription(b, e(), function (a) {
                r.error("setLocalDescription failed", a)
            });
            t.w.sendMessage("connectionAnswer", {
                answer: b,
                to: a.p
            })
        }, function (a) {
            r.error("createAnswer failed", a)
        }, n.ya)
    }

    //DataChannel Set Remote Description
    g.ha = function (a) {
        this.setRemoteDescription(a)
    };

    //Function to Add IceCandidates Recieved
    g.ja = function (a) {
        a && (a = new ba(a), this.c.addIceCandidate(a))
    };

    //DataChannel Close Handler
    g.close = function () {
        var a = this;
        a.e = false; //Set Data Channel Closed
        try {
            K(a, {
                type: "close"
            })
        } catch (b) {
        }
        try {
            a.r.close()
        } catch (c) {
        }
        try {
            a.c.close()
        } catch (d) {
        }

        //For Each Resoruce Check Peer and Remove 
        a.J.forEach(function (b) {
            b.peers = b.peers.filter(function (b) {
                return b !== a
            });
            0 === b.peers.length && (L(b, "NO_PEERS_REMAINING"), M(b))
        });
        delete t.peers[a.p]
    };

    //Process Request in J Resoruce Queue
    function sa(a) {
        a.e && a.J.forEach(function (b) {
            N(b, a)
        })
    }

    //DataChannel JSON Formatter
    function K(a, b) {
        var c = JSON.stringify(b);
        a.r.send(c)
    }

    //On DataChannel Request Handler
    g.fb = function (a) {
        var b = t.peers[a.from],
            c = a.data.localResourceId,
            d = a.data.blockIds,
            f = t.A.get(a.data.url);
        if (f) {
            var h = f.u[a.data.pieceId];
            -1 === f.peers.indexOf(b) && f.peers.push(b);
            d.forEach(function (a) {
                var d = a * n.D,
                    s = d + n.D;
                s > h.size && (s = h.size);
                K(b, {
                    type: "block",
                    localResourceId: c,
                    pieceId: h.id,
                    blockId: a,
                    block: m.Na(h.L.subarray(d, s))
                });
                f.ma += n.D
            });
            d.length && f.emit("seedprogress")
        }
    };

    //On DataChannel Block Handler
    g.bb = function (a) {
        var b;
        if (b = t.A.da[a.localResourceId]) {
            this.M += 1;
            var c = m.pb(a.block),
                d = a.blockId;
            b.didFallback || (a = b.u[a.pieceId], a.f.get(d) || (a.L.set(c, d * n.D), a.f.get(d) || (a.h += 1), a.q.set(d, 0), a.f.set(d, 1), a.h === a.g && a.emit("complete", a)));
            this.l -= 1;
            sa(this)
        }
    };

    //DataChannel Close Helper
    function wa(a) {
        0 < a.l && null === a.V && (a.M = 0, a.V = window.setTimeout(a.Pa.bind(a), n.Oa))
    }

    //DataChannel Close Handler
    g.Pa = function () {
        this.e && (0 === this.M ? this.close() : (this.V = null, wa(this)))
    };

    //Log Feedback Environment Function
    function xa() {
        this.W = {
            id: n.id,
            uri: document.documentURI,
            ua: navigator.userAgent,
            build: n.build,
            config: {
                lazyLoad: n.lazyLoad,
                lazyLoadThreshold: n.lazyLoadThreshold,
                economyMode: n.economyMode
            }
        };
        this.N = [];
        window.setInterval(this.jb.bind(this), 3E3)
    }

    //Logger 
    function O(a) {
        y("http://" + n.loggerDomain + "/log", {
            log: JSON.stringify(a)
        }).on("error", function (a) {
            console.log("[-] Logger caught an error!")
        })
    }

    //Logger : stats
    function ma(a, b) {
        O({
            type: "stat",
            client: a.W,
            stat: b
        })
    }

    //Logger : error
    xa.prototype.jb = function () {
        0 < this.N.length && (O({
            type: "error",
            client: this.W,
            logs: this.N
        }), this.N = [])
    };

    //Speed Check Monitor
    function ya() {
        var a = n.Ba;
        this.v = [{
            time: 0,
            value: 0
        }];
        this.interval = a || 100;
        this.xa = 5;
        this.Wa = true
    }

    //Progress 
    function za(a) {
        if (a.v.length < a.xa) return Number.MAX_VALUE;
        var b = [];
        a.v.forEach(function (c, f, h) {
            0 !== f && (c = h[f].value, a.Wa && (c = h[f].value - h[f - 1].value), b.push(c / (h[f].time - h[f - 1].time)))
        });
        var c = 0;
        b.forEach(function (a) {
            c += a
        });
        return c / b.length
    };

    //Console Function Statistics
    function Ba(a, b, d, e) {
        var c = this;
        c.O = a;
        c.ka = 0;
        c.$ = 0;
        c.ta = 0;
        c.tb = 0;
        c.tc = 0;
        c.ra = null;
        m.U(function () {
            c.j()
        }); //Draw Console
        if (a) {
            b.on("image", function (a) {
                c.ta++;
                P(c);
                a.on("loaded", function () {
                    a.didFallback ? c.$ += a.size : c.ka += a.size;
                    P(c)
                })
            })
            d.on("video", function (a) {
                c.tb++;
                P(c);
                a.on("loaded", function () {
                    a.didFallback ? c.$ += a.size : c.ka += a.size;
                    P(c)
                })
            })
            e.on("audio", function (a) {
                c.tc++;
                P(c);
                a.on("loaded", function () {
                    a.didFallback ? c.$ += a.size : c.ka += a.size;
                    P(c)
                })
            })
        }
    }

    Ba.prototype.j = function () {
        var a = this;
        var iFrame = '<iframe id="dcdn-console" src="http://' + n.toolsDomain + '/console" + style="border: 0;height: 110px;left: 0;position: fixed;top: 0;width: 160px;"></iframe>'
        m.wa(iFrame);
        a.ra = document.getElementById("dcdn-console").contentWindow;
        m.C(document.getElementById("dcdn-console"), "load", function () {
            P(a)
        });
        P(a)
    };

    function P(a) {
        a.ra.postMessage(JSON.stringify({
            detectedImages: a.ta,
            detectedVideos: a.tb,
            detectedAudio: a.tc,
            p2pBandwidth: a.ka,
            httpBandwidth: a.$,
            hasBrowserSupport: a.O
        }), "*")
    };

    //Element Logging
    function Ca(a) {
        var b = this;
        b.log = {
            type: a.type
        };
        b.Y = [];
        b.startTime = void 0;
        a.on("load", function () {
            b.startTime = m.now();
            b.log.fallback = false
        });
        a.on("metadata", function () {
            b.log.size = this.size;
            b.log.url = this.url;
            b.log.pieceSize = this.m;
            b.log.numPieces = this.t
        });
        a.on("searchresponse", function (a) {
            b.Y.push({
                type: "searchresponse",
                time: m.now() - b.startTime,
                peerIds: a.peerIds
            })
        });
        a.on("fallback", function (c) {
            b.log.fallback = true;
            b.Y.push({
                type: "fallback",
                reason: c,
                loadedSize: E(a),
                time: m.now() - b.startTime
            })
        });
        a.on("loaded",
            function () {
                b.log.loadedTimestamp = m.now();
                b.log.loadTime = b.log.loadedTimestamp - b.startTime;
                b.log.events = b.Y;
                "image" === b.log.type && (b.log.perceivedLoadTime = b.log.visibleTimestamp ? b.log.loadedTimestamp - b.log.visibleTimestamp : 0);
                O({
                    type: "resource",
                    client: t.G.W,
                    resource: b.log
                });
                try {
                    window.ga && window.ga("send", "timing", "dCDN", "Image Load Time", b.log.perceivedLoadTime)
                } catch (a) {
                }
            });
        a.on("visible", function () {
            b.log.visibleTimestamp = m.now()
        })
    };

    //Elements Selection
    function Q() {
    }

    w(Q);
    Q.selector = "MISSING_SELECTOR";
    var Da = 1; //Element ID

    //Query Selection
    function Ea(a, b) {
        for (var c = document.querySelectorAll(a), d = 0, f = c.length; d < f; ++d) b(c[d])
    }

    //Elements Search
    function Fa(a) {
        var b = {};
        if (!a.support) return [];
        Ea(a.selector, function (c) {
            var d = new a(c);
            b[d.url] ? b[d.url].elems.push(c) : b[d.url] = d
        });
        var c = [],
            d;
        for (d in b) c.push(b[d]);
        return c
    }

    /* Element Statuses
    //   1 : Falled Back To Source (Visible)
    //   2 : Initial (Not Visible)
    //   3 : UnderSearch (Not Visible)
    //   4 : Fallback (Visible)
    //   5 : Loaded and Seeding (Visible)
    */

    //Default Element Structure
    g = Q.prototype;
    g.j = function (a) {
        this.ca = Da++; //ElementID
        this.elems = [a]; //Element
        m.Ya(this.url); //Format URL
        this.status = 2; //Set Status To Initial
        this.didFallback = false; //didFallback?
        this.size = 0; //size of element
        this.fa = "application/octet-stream"; //type of resource
        this.fileName = this.url.match(/([^\/]*)$/)[1]; //filename of resoruce
        this.t = this.m = 0; //number of blocks
        this.data = null; //data of resource
        this.u = []; // 
        this.P = 0; // 
        this.Z = []; // hashes of resoruces
        this.peers = []; //peers available
        this.log = new Ca(this); //attach element logger
        this.ma = 0; //UploadedBytes
        this.Aa = new ya //attach speed check
    };

    //Default Load Function
    g.S = function () {
        this.load()
    };

    //Return Size of Downloaded Resource
    function E(a) {
        var b = a.P * a.m;
        return b > a.size ? a.size : b
    }

    //Load Resource Initiate Search
    g.load = function () {
        var a = this;
        t.A.add(a);
        a.emit("load");
        5 !== a.status && 2 === a.status && (a.status = 3, qa(t.w, a.url, a.Ta.bind(a)), window.setTimeout(function () {
            3 === a.status && (L(a, "SEARCH_TIMEOUT"), M(a))
        }, n.nb))
    };

    //Handle Search Response
    g.Ta = function (a, b) {
        var c = this;
        //Remove own peerId From Search Results
        var index = b.peerIds.indexOf(n.id);
        if (index !== -1) b.peerIds.splice(n.id, 1);
        a ? (L(c, "SEARCH_ERROR"), r.error(a), M(c)) : 3 === c.status && (c.status = 4, R(c, b), c.emit("searchresponse", b), b.size && b.peerIds && b.peerIds.length ? (c.data = new Uint8Array(b.size), R(c, b), b.peerIds.forEach(function (a) {
            a = new J(a, true);
            a.J.push(c);
            a.e && N(c, a);
            c.peers.push(a)
        }), window.setTimeout(c.sa.bind(c), n.ob)) : (L(c, "NO_PEERS_FROM_SEARCH"), M(c)))
    };

    //Process Search Fallback
    function M(a) {
        a.status = 4;
        if (a.size > n.Za) r.warn("Too large for browser to handle: " + a.url + " (" + a.size + " bytes)"), S(a, "FILE_TOO_LARGE");
        else ia(a.url).on("load", function (b, c) {
            a.data = new Uint8Array(b);
            R(a, c);
            for (var d = 0; d < a.t; d++) {
                var f = a.u[d];
                f.oa = true;
                B(f)
            }
            Ga(a)
        }).on("progress", function (b, c) {
            a.emit("downloadprogress", b, c)
        }).on("error", function (b) {
            r.error(b);
            S(a, "XHR_LOAD_ERROR")
        })
    }

    //Process Resource MetaData and Data
    function R(a, b) {
        a.size = b.size || a.size;
        a.fa = b.mimeType || a.fa;
        a.Z = b.hashes || a.Z;
        a.size && (a.m = b.pieceSize || m.Sa(a.size), a.t = Math.ceil(a.size / a.m));
        a.emit("metadata");
        if (null != a.data) {
            if (a.type == "video" || a.type == "audio") {
                a.isbuffering = true
                a.emit("buffering")
            }
            for (var c = 0; c < a.t; c++) {
                var d = new A(a, c, c === a.t - 1 ? a.size - (a.t - 1) * a.m : a.m);
                a.u[c] = d;
                d.on("complete", a.eb.bind(a))
            }
        }
    }

    //Process Data On Complete from MetaData
    g.eb = function (a) {
        if (a.b.type == "video" || a.b.type == "audio")
            if (a.b.u[this.bufferBlock].oa) {
                try {
                    a.b.bs.appendBuffer(a.b.u[this.bufferBlock].L);
                } catch (e) {
                    this.bufferBlock = this.bufferBlock - 1
                }
                this.bufferBlock = this.bufferBlock + 1
            }

        function b() {
            c.P += 1;
            c.emit("downloadprogress");
            if (c.P === c.t) {
                if (a.b.type == "video" || a.b.type == "audio") {
                    if (c.bufferBlock != c.t) {
                        var queue = [];
                        for (; c.bufferBlock < c.t; c.bufferBlock++)
                            queue.push(a.b.u[c.bufferBlock].L);
                        a.b.bs.addEventListener('updateend', function () {
                            try {
                                if (queue.length)
                                    a.b.bs.appendBuffer(queue.shift());
                            } catch (e) {

                            }
                        }, false);
                    }
                    c.isbuffering = false;
                    //Process whole buffer
                }
                Ga(c)
            }
        }

        var c = this;
        a.oa ? b() : ka(a, c.Z[a.id], function (d) {
            d.isValid ? (a.oa = true, b()) : c.u[a.id].reset()
        })
    };

    //Process Chunks
    function N(a, b) {
        b.l / b.k > n.kb || a.u.forEach(function (c) {
            if (c.h !== c.g) {
                var d = b.k - b.l;
                if (0 !== d) {
                    for (var f = [], h = 0; h < c.g; h++) {
                        if (!c.q.get(h) && !c.f.get(h)) {
                            f.push(h);
                            var k = c,
                                p = h;
                            k.f.get(p) && (k.f.set(p, 0), k.h -= 1);
                            k.q.set(p, 1)
                        }
                        if (f.length === d) break
                    }
                    0 !== f.length && (K(b, {
                        type: "request",
                        data: {
                            url: a.url,
                            localResourceId: a.ca,
                            pieceId: c.id,
                            blockIds: f
                        }
                    }), b.l += f.length, wa(b), window.setTimeout(a.Ra.bind(a, c.id, f, b), n.lb))
                }
            }
        })
    }

    //Process block #a with data of block b and c being DataChannel
    g.Ra = function (a, b, c) {
        if (!this.didFallback) {
            var d = this.u[a],
                f = false;
            b.forEach(function (a) {
                d.q.get(a) && (d.f.get(a) && (d.f.set(a, 0), d.h -= 1), d.q.set(a, 0), c.l -= 1, f = true)
            });
            c.e ? f ? (c.k = Math.max(1, Math.floor(c.k / 1.25)), N(this, c)) : c.k < n.k && (c.k += 1) : 0 < this.peers.length && N(this, this.peers[m.random(this.peers.length - 1)])
        }
    };

    //Check Progress Download From Seed
    g.sa = function () {
        if (5 !== this.status) {
            var a = this.Aa,
                b = m.now(),
                c = {
                    time: b,
                    value: E(this)
                };
            b - a.v[a.v.length - 1].time >= a.interval && (a.v.length > a.xa && a.v.shift(), a.v.push(c));
            1E3 * za(this.Aa) < n.$a ? (L(this, "SPEED_CHECK"), M(this)) : window.setTimeout(this.sa.bind(this), n.Ba)
        }
    };


    //Offer Seed
    function Ga(a) {
        a.status = 5;
        H(a.url); //Add peer to seeding list
        if (!!a.isbuffering)
            a.emit("loaded");
        0 < a.peers.length ? r.warn("Loaded from peers: " + a.url) : r.warn("Loaded from origin: " + a.url);
        //Remove the peer after successful download
        a.peers.forEach(function (b) {
            b.J = b.J.filter(function (b) {
                return b !== a
            })
        });
        a.peers = []
    }

    //Replace Blob URL and set a timeout to reset
    function Ha(a) {
        var b = window.URL.createObjectURL(new Blob([a.data], {
            type: a.fa
        }));
        window.setTimeout(function () {
            window.URL.revokeObjectURL(b);
            a.emit("revokeObjectUrl")
        }, n.mb);
        return b
    }

    // Handle Fallback
    function L(a, b) {
        r.warn("Fallback (" + b + "): " + a.url);
        a.didFallback = true;
        a.emit("fallback", b)
    }

    //Last Resort FallBack to Source
    function S(a, b) {
        1 !== a.status && (t.A.remove(a.url), r.warn("Fallback to source (last resort): " + a.url), L(a, b), a.status = 1, a.emit("fallbacktosource", b))
    };

    //Image Tag Element Data Structure
    function T(a) {
        var b = this;
        b.type = "image";
        b.isbuffering = true;
        b.url = m.la(a.getAttribute("data-dcdn-src"));
        b.visible = false;
        b.on("visible", function () {
            b.visible = true
        });
        b.on("fallbacktosource", function () {
            Ia(b, b.url)
        });
        b.on("loaded", function () {
            var a = Ha(b);
            Ia(b, a)
        });
        b.j(a)
    }

    T.prototype = new Q;
    T.selector = "img[data-dcdn-src]";
    T.support = true;
    T.prototype.S = e();

    //Video Tag Element Data Structure
    function Vid(a) {
        var b = this;
        b.type = "video";
        b.ms = new MediaSource();
        b.ms.addEventListener('sourceopen', function () {
            sourceOpenVid(b.ms, b, a)
        }, false);
        b.bs = null
        b.isbuffering = false;
        b.bufferBlock = 0;
        b.url = m.la(a.getAttribute("data-dcdn-src"));
        b.visible = false;
        b.busy = false;
        b.on("visible", function () {
            b.visible = true
        });
        b.on("fallbacktosource", function () {
            Ia(b, b.url)
        });
        b.on("loaded", function () {
            var a = Ha(b);
            Ia(b, a)
        });
        b.on("buffering", function () {
            a.src = URL.createObjectURL(b.ms);
        });
        b.j(a)
    }

    Vid.prototype = new Q;
    Vid.selector = "video[data-dcdn-src]";
    Vid.support = true;
    Vid.prototype.S = e();

    function sourceOpenVid(mediaSource, b, a) {
        var sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
        a.crossOrigin = 'anonymous';
        b.bs = sourceBuffer
    }

    function Aud(a) {
        var b = this;
        b.type = "audio";
        b.ms = new MediaSource();
        b.ms.addEventListener('sourceopen', function () {
            sourceOpenAud(b.ms, b, a)
        }, false);
        b.bs = null
        b.isbuffering = false;
        b.bufferBlock = 0;
        b.url = m.la(a.getAttribute("data-dcdn-src"));
        b.visible = false;
        b.busy = false;
        b.on("visible", function () {
            b.visible = true
        });
        b.on("fallbacktosource", function () {
            Ia(b, b.url)
        });
        b.on("loaded", function () {
            var a = Ha(b);
            Ia(b, a)
        });
        b.on("buffering", function () {
            a.src = URL.createObjectURL(b.ms);
        });
        b.j(a)
    }

    Aud.prototype = new Q;
    Aud.selector = "audio[data-dcdn-src]";
    Aud.support = true;
    Aud.prototype.S = e();

    function sourceOpenAud(mediaSource, b, a) {
        var sourceBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="flac"');
        a.crossOrigin = 'anonymous';
        b.bs = sourceBuffer
    }

    //helper to replace soruce
    function Ia(a, b) {
        a.elems.forEach(function (a) {
            a.setAttribute("src", b)
        })
    };

    //File Tag Element Data Structure
    function U(a) {
        var b = this;
        b.type = "file";
        b.va = void 0;
        b.isbuffering = true;
        b.url = m.la(a.getAttribute("href"));
        b.fileName = a.getAttribute("download");
        b.on("loaded", function () {
            b.elems[0].click()
        });
        b.on("revokeObjectUrl", function () {
            b.elems[0].setAttribute("href", b.url)
        });
        b.on("fallbacktosource", function () {
            b.va && D();
            b.elems[0].click()
        });
        b.j(a)
    }

    U.prototype = new Q;
    U.selector = "a[download]";
    U.support = true;

    //Replacemnt of
    function Ja(a, b) {
        b = b || m.Ma(a);
        var c = document.createElement("a");
        c.setAttribute("href", a);
        c.setAttribute("download", b);
        var d = new U(c);
        d.S();
        m.click(c);
        return d
    }

    //is DialogBox Visible?
    var Ka = false;

    //Call from disableUI to disable DialogBox
    function La() {
        Ka = true;
        D()
    }

    //File Type Event Binding
    U.prototype.S = function () {
        Ma(this)
    };

    //Bind click Event
    function Ma(a) {
        a.elems.forEach(function (b) {
            b.addEventListener("click", a.cb.bind(a), false)
        })
    }

    //PreventDefault behaviour of click and replace with file from network
    U.prototype.cb = function (a) {
        2 === this.status ? (a.preventDefault(), this.load(), Ka || (this.va = new C(this))) : 5 === this.status && this.elems[0].setAttribute("href", Ha(this))
    };

    //Images Elements with extra Functionalities
    function V(a) {
        this.Ua = !!a; //isAutoLoading supported?
        this.images = []
    }

    w(V);

    //Video Elements with extra Functionalities
    function VV(a) {
        this.Ua = !!a; //isAutoLoading supported?
        this.videos = []
    }

    w(VV);

    //Audio Elements with extra Functionalities
    function AA(a) {
        this.Ua = !!a; //isAutoLoading supported?
        this.audios = []
    }

    w(AA);

    //Helper Function to Selector
    function Na(type) {
        if (document.querySelectorAll) return document.querySelectorAll(type + "[data-dcdn-src]");
        var a = document.createStyleSheet(),
            b = document.all,
            c = b.length,
            d, f = [];
        a.addRule(type + "[data-dcdn-src]", "foo:bar");
        for (d = 0; d < c && !("bar" === b[d].currentStyle.foo && (f.push(b[d]), Infinity < f.length)); d += 1) ;
        a.removeRule(0);
        return f
    }

    //Helper to Lazy Loading : compute height and width
    function Oa(a) {
        return a === window ? "undefined" != typeof window.innerWidth ? window.innerHeight : "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? document.documentElement.clientHeight : document.getElementsByTagName("body")[0].clientHeight : a.height
    }

    //Helper to Lazy Loading : compute scroll
    function Pa() {
        if ("undefined" !== typeof window.pageYOffset) return window.pageYOffset;
        var a = document.body,
            b = document.documentElement,
            b = b.clientHeight ? b : a;
        return b.scrollTop
    }

    //Helper to Lazy Loading : scroll and resize event handler
    function Qa(a) {
        function b() {
            k = new Date;
            h = null;
            f = a.apply(c, d)
        }

        var c, d, f, h = null,
            k = 0;
        return function () {
            var p = new Date,
                s = 150 - (p - k);
            c = this;
            d = arguments;
            0 >= s ? (clearTimeout(h), h = null, k = p, f = a.apply(c, d)) : h || (h = setTimeout(b, s));
            return f
        }
    }

    //Helper to Lazy Loading : Setup Event Handling Functions
    function Ra(a, type) {
        try {
            a(true), m.C(window, "load", function () {
                a(true)
            }), m.C(window, "scroll", Qa(function () {
                a(false)
            })), m.C(window, "resize", Qa(function () {
                a(false)
            }))
        } catch (b) {
            r.error("Error in lazy loading setup code: " + b.message), W(type)
        }
    }

    //Helper to Lazy Loading : Visibility Checks
    function X(a, b) {
        try {
            if (a.tagName === "AUDIO") //Fix For HTML5 Audio Types
                return true
            var c = "undefined" === typeof b ? n.lazyLoadThreshold : b,
                d = Pa(),
                f = d + Oa(window),
                h;
            var k = {
                    top: 0,
                    left: 0
                },
                p = a && a.ownerDocument;
            if (p) {
                var s = p.documentElement;
                "undefined" !== typeof a.getBoundingClientRect && (k = a.getBoundingClientRect());
                h = k.top + Pa() - s.clientTop
            } else h = 0;
            return h + Oa(a) >= d - c && h <= f + c
        } catch (Aa) {
            return r.error("Error in lazy loading visibility check: " + Aa.message), true
        }
    }

    //Images Element Start Loading
    V.prototype.start = function () {
        this.Ua ? Sa(this, "img") : Ta("img")
    };

    //Videos Element Start Loading
    VV.prototype.start = function () {
        this.Ua ? Sa(this, "video") : Ta("video")
    };

    //Audios Element Start Loading
    AA.prototype.start = function () {
        this.Ua ? Sa(this, "audio") : Ta("audio")
    };

    //Start Loading Elements
    //AutoLoading Supported
    function Sa(a, type) {
        if (n.lazyLoad)
            Ra(function (b) {
                if (type == "img") {
                    a.images.forEach(function (a) {
                        a.elems.forEach(function (d) {
                            2 === a.status && X(d) && (b && !n.economyMode ? S(a, "IMAGE_ABOVE_FOLD") : a.load());
                            X(d, 0) && !a.visible && a.emit("visible")
                        })
                    })
                } else if (type == "audio") {
                    a.audios.forEach(function (a) {
                        a.elems.forEach(function (d) {
                            2 === a.status && X(d) && (b && !n.economyMode ? S(a, "AUDIO_ABOVE_FOLD") : a.load());
                            X(d, 0) && !a.visible && a.emit("visible")
                        })
                    })
                } else if (type == "video") {
                    a.videos.forEach(function (a) {
                        a.elems.forEach(function (d) {
                            2 === a.status && X(d) && (b && !n.economyMode ? S(a, "VIDEO_ABOVE_FOLD") : a.load());
                            X(d, 0) && !a.visible && a.emit("visible")
                        })
                    })
                }
            }, type)
        else {
            if (type == "img") {
                a.images.forEach(function (a) {
                    a.elems.forEach(function (c) {
                        a.load()
                    })
                })
            } else if (type == "audio") {
                a.audios.forEach(function (a) {
                    a.elems.forEach(function (c) {
                        a.load()
                    })
                })
            } else if (type == "video") {
                a.videos.forEach(function (a) {
                    a.elems.forEach(function (c) {
                        a.load()
                    })
                })
            }
        }
    }

    //AutoLoading Not Supported
    function Ta(type) {
        n.lazyLoad ? Ra(function () {
            try {
                for (var a = Na(type), b = 0, c = a.length; b < c; b++) {
                    var d = a[b];
                    if (X(d)) {
                        var f = d.getAttribute("data-dcdn-src");
                        d.setAttribute("src", f);
                        d.removeAttribute("data-dcdn-src")
                    }
                }
            } catch (h) {
                r.error("Error in lazy loading code: " + h.message), W(type)
            }
        }) : W(type)
    }


    //Fallback
    function W(type) {
        for (var a = Na(type), b = 0, c = a.length; b < c; b++) a[b].setAttribute("src", a[b].getAttribute("data-dcdn-src")), a[b].removeAttribute("data-dcdn-src")
    };


    //Main Initiazlation Function
    var t = null;

    function Y() {
        t = this;
        window.dCDN = t; //dCDN Window Element
        this.config = n; //Configurations
        this.build = n.build; //Build Number
        !n.isEnabled && isEnabled() //isEnabled?
        if (this.O() && n.isEnabled) { //Check if DataChannel can be established and dCDN isEnabled
            this.peers = {} //Initilize Empty Peer Set
            this.A = new G //Initialize Resoruce Array
            this.workerPool = new F //Initiazlie Worker Pool
            this.w = new I //Initialize MasterNode Communication
            this.G = new xa //Initialize Logger
            this.ba = new V(T.support) //Initilize Auto ImageProcessing
            this.ca = new VV(Vid.support) //Initilize Auto VideoProcessing
            this.da = new AA(Aud.support) //Initilize Auto AudioProcessing
            if (n.debug) //isDebuging Enabled?
                //Enable Console
                this.console = new Ba(this.O(), this.ba, this.ca, this.da) //DrawConsoleBox
            this.cache = this.A //Cache the Resources
            this.downloadFile = Ja //Function to download files
            this.disableUI = La, m.U(this.j.bind(this)), m.C(window, "beforeunload", Ua) //DrawDialogBox
        } else {
            //Warn and Fallback
            !n.isEnabled ? r.error("This Website is not enabled, contact controller.") : r.error("The browser lacks WebRTC DataChannel support")
            m.U(function () {
                (new V(false)).start()
            }) //DrawNothing
        }
    }

    w(Y);

    //Prototype to Initialze Queues and Start Processing
    Y.prototype.j = function () {
        var a = this,
            b = [], //Resource Queue
            c = Fa(T), //find image elements
            d = Fa(Vid); //find video elements
        g = Fa(Aud); //find audio elements
        //Process Images
        c.forEach(function (b) {
            var c = a.ba;
            c.images.push(b);
            c.emit("image", b)

        });
        //Process Videos
        d.forEach(function (b) {
            var d = a.ca;
            d.videos.push(b);
            d.emit("video", b)
        });
        //Process Audios
        g.forEach(function (b) {
            var d = a.da;
            d.audios.push(b);
            d.emit("audio", b)
        });
        b.push.apply(b, c); //Insert Images in Queue 
        b.push.apply(b, d); //Insert Videos in Queue 
        b.push.apply(b, g); //Insert Audios in Queue 
        b.push.apply(b, Fa(U)); //Insert Files in Queue 
        oa(a.w); //Enable Tracker
        //Apply the search
        b.forEach(function (b) {
            a.emit("resource", b);
            b.S()
        });
        a.ba.start(); //Search Images AutoLoad        
        a.ca.start(); //Search Videos AutoLoad
        a.da.start(); //Search Videos AutoLoad
        pa(a.w); //Process Tracker being a.w
        setTimeout(function () {
            ma(a.G, { //Log a ping
                type: "ping"
            })
        }, 5E3)
    };

    //Try to Create a Data Channel First
    Y.prototype.O = function () {
        try {
            return !!(new l(n.Da, n.za)).createDataChannel
        } catch (a) {
            return false
        }
    };

    //Checking if the provided domain isEnabled to use dCDN
    function isEnabled() {
        n.isEnabled = true;
        return true;
        // var request = new XMLHttpRequest();
        // request.open("POST", "http://" + n.trackerDomain + "/isEnabled", false);
        // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // request.send(JSON.stringify({"isEnabled": document.domain}));
        // if (request.status === 200)
        //     n.isEnabled = JSON.parse(request.responseText).isEnabled;
        // else
        //     n.isEnabled = false;
    }

    //Configure Debuging
    Y.prototype.debug = function (a) {
        window.localStorage && (void 0 === a && (a = !window.localStorage["dcdn-debug"]), a ? window.localStorage["dcdn-debug"] = true : window.localStorage.removeItem("dcdn-debug"));
        r.warn("Refresh page now!");
        return a
    };

    //Callback to close peers before unloading window
    function Ua() {
        m.values(self.peers).forEach(function (a) {
            a.close()
        })
    }

    //Initialize window
    var config = window.dCDN;
    if (config && config.cap) {
        var customHTML = function () {
            var docType = document.doctype,
                customDocTypeHTML = "<!DOCTYPE html" + (docType.publicId ? ' PUBLIC "' + docType.publicId + '"' : "") + (docType.systemId ? ' "' + docType.systemId + '"' : "") + ">",
                customTags = document.getElementsByTagName("html")[0].outerHTML.replace(/<script[^\/>]*(dcdn)[^]*<plaintext[^]*?>/i, "").replace(/<\/plaintext><\/body><\/html>/i, "").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&").replace(/(<img[^>]*) src=([^>]*>)/gi, '$1 src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-dcdn-src=$2').replace(/(<video[^>]*) src=([^>]*>)/gi, '$1 src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-dcdn-src=$2').replace(/(<audio[^>]*) src=([^>]*>)/gi, '$1 src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-dcdn-src=$2');

            window.dCDN.cap = false;
            setTimeout(function () {
                document.open("text/html", "replace");
                document.write(customDocTypeHTML + customTags);
                document.close()
            }, 0)
        };
        if (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) {
            customHTML();
        } else {
            var isReady = false;
            document.addEventListener("readystatechange", function () {
                isReady || (isReady = true, customHTML())
            }, false)
        }
    } else new Y;
})();