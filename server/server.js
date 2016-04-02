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
  socket.on("createNewBid", function(data){
    mongo.createNewBid(data.uid,data.cost,data.aid,function(data){
      socket.emit("createNewBid",data);
    });
  });
  socket.on("getUserInfo",function(data){
    mongo.getUserInfo(data.uid, data.username, function(obj){
      socket.emit("getUserInfo", obj);
    })
  });
  socket.on("createNewAuction",function(data){
    mongo.createNewAuction(data.uid,data.title,data.description,data.startingAmount,function(result){
      socket.emit("createNewAuction",result);
    });
  });
  socket.on("getBidHistory",function(uid){
    mongo.getBidHistory(uid,function(result){
      socket.emit("getBidHistory",result);
    });
  });
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

    // mongo.getUserInfo(940,outputCallback);
    // mongo.createNewUser(UID, "a_cool_username", outputCallback);

    // var auctionID;

    // mongo.createNewAuction(UID,"Mow my Lawn","Mow my lawn twice a week. I live in Long Beach",20,
    //     function(result){
    //         auctionID = result._id;
    //         console.log(result);

    //         //Bid on my own auction 3 times
    //         mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
    //         mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
    //         mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, function(){

    //         });


    //     });

    // mongo.getBidHistory(940,outputCallback);

}

setTimeout(function(){
    //wait 1 sec to let mongo connect for testing.
    //in prod it is fine, since no queries should execute immediately
    // testDB();
},1000);