var app = require("express")(),
	path = require("path"),
	http = require('http').Server(app),
	io = require("socket.io")(http);

var mongo = require("./mongo.js");

app.get('/', function(req, res){
  res.sendFile(path.resolve( __dirname + '/../public_html/index.html'));
});

app.get(/^(.+)$/, function(req, res){
	console.log('static file request : ' + req.params[0]);
	res.sendFile(path.resolve(__dirname + "/../public_html/" + req.params[0]));
});
io.on('connection', function(socket){
  console.log('a user connected');
  	socket.on("bidHistory",function(uid){
  		bidHistory(uid,function(history){
  			socket.emit("bidHistory",history);
  		})
  	});

    setInterval(function() {
        socket.emit("hello",{
            hello: "hi",
            goodbye: 124
        })
    }, 1000);


});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

var bidHistory = function(uid, callback){
	var history = ["bye","hi","it works!!!","hahaha suck it angular!"]
	callback(history);
}

function testDB(){
    mongo.foo();
    //UID needs to come from oauth, random for testing
    var UID = Math.floor((Math.random() * 1000) + 1);
    var outputCallback = function(result){console.log("CALLBACK",result)};

    mongo.createNewUser(UID, "a_cool_username", outputCallback);


    mongo.createNewAuction(UID,"Mow my Lawn","Mow my lawn twice a week. I live in Long Beach",20, outputCallback)

    //Bid on my own auction 5 times
    mongo.createNewBid(UID, (Math.random() * 10) + 1, outputCallback);
    mongo.createNewBid(UID, (Math.random() * 10) + 1, outputCallback);
    mongo.createNewBid(UID, (Math.random() * 10) + 1, outputCallback);
    mongo.createNewBid(UID, (Math.random() * 10) + 1, outputCallback);
    mongo.createNewBid(UID, (Math.random() * 10) + 1, outputCallback);
}

setTimeout(function(){
    //wait 1 sec to let mongo connect for testing.
    //in prod it is fine, since no queries should execute immediately
    testDB();
},1000);