var app = require("express")(),
	  path = require("path"),
    http = require('http').Server(app),
    io = require("socket.io")(http);

var sockets = require("./io.js");
var mongo = require("./mongo.js");

sockets.listen(http,io);

app.get('/', function(req, res){
  res.sendFile(path.resolve( __dirname + '/../public_html/index.html'));
});

app.get(/^(.+)$/, function(req, res){
	res.sendFile(path.resolve(__dirname + "/../public_html/" + req.params[0]));
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});


function testDB(){
    mongo.foo();
    //UID needs to come from oauth, random for testing
    var UID = Math.floor((Math.random() * 1000) + 1);
    var outputCallback = function(result){console.log("CALLBACK",result)};

    mongo.createNewUser(UID, "cool_username", outputCallback);
    //mongo.getUserInfo(999999, "a_cool_username", outputCallback);

    var auctionID;

    mongo.createNewAuction(UID,"Mow my Lawn","Mow my lawn twice a week. I live in Long Beach",20,
        function(result){
             auctionID = result._id;
             console.log(result);

             //Bid on my own auction 3 times
             mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
             mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
             mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, function(){
                 mongo.getAuctionDetails(auctionID,outputCallback)
             });
        });

    mongo.getBidHistory(UID,outputCallback);

    mongo.searchAuctions("lawn",outputCallback)
}

setTimeout(function(){
    //wait 1 sec to let mongo connect for testing.
    //in prod it is fine, since no queries should execute immediately
    // testDB();
},1000);