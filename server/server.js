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
    var UID = Math.floor((Math.random() * 1000) + 1) + "";
    UID = "google:100091013565947923608";

    var outputCallback = function(result){console.log("CALLBACK",result)};

    //mongo.createNewUser(UID, "cool_username", outputCallback);
    //mongo.getUserInfo(999999, "a_cool_username", outputCallback);

    var auctionID;

    mongo.login(UID, "cool_username", outputCallback);
    //mongo.getAuctionsWon(UID, outputCallback);
    //mongo.getUserInfo(UID, outputCallback);
    //
    mongo.createNewAuction(UID,"lawn","Mow my lawn twice a week. I live in Long Beach",20,
        function(result){
             auctionID = result._id;
             console.log(result);

            //mongo.setFeedbackForClient(auctionID, "He didn't pay me", 1, outputCallback);
            mongo.setFeedbackForProvider("5705fa49447888edd48a39a2", "He did a good job mowing my lawn", 4, outputCallback);


             //Bid on my own auction 3 times
             //mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
             //mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
             //mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, function(data){
             //    var bidID = data._id;
             //    //setTimeout(function(){
             //        //mongo.getAuctionDetails(auctionID,outputCallback)
             //        mongo.clientChooseBid(UID,auctionID, bidID, function(){
             //            setTimeout(function(){
             //
             //               mongo.setFeedbackForProvider(auctionID, "He did a good job mowing my lawn", 4, outputCallback);
             //            },1000)
             //
             //        });
             //
             //
             //    //},1000)
             //});
        });

    //mongo.getBidHistory(UID,outputCallback);
    //
    //mongo.searchAuctions("lawn",outputCallback)
    //
    //mongo.getUserOpenAuctions("google:115290454625517269520",outputCallback)
    //mongo.getUserAuctionHistory("google:115290454625517269520",outputCallback)
    //mongo.getUserParticipatingOpenAuctions("google:100091013565947923608",outputCallback)


}

setTimeout(function(){
    //wait 1 sec to let mongo connect for testing.
    //in prod it is fine, since no queries should execute immediately
    // testDB();
},3000);