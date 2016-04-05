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
    var outputCallback = function(result){console.log("CALLBACK",result)};

    mongo.createNewUser(UID, "cool_username", outputCallback);
    //mongo.getUserInfo(999999, "a_cool_username", outputCallback);

    var auctionID;
    mongo.login(UID, "cool_username", outputCallback);
    mongo.getUserInfo(UID, outputCallback);

    UID = "google:115290454625517269520";
    mongo.createNewAuction(UID,"helloWorld Mow my Lawn","Mow my lawn twice a week. I live in Long Beach",20,
        function(result){
             auctionID = result._id;
             console.log(result);

             //Bid on my own auction 3 times
             mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
             mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, outputCallback);
             mongo.createNewBid(UID, (Math.random() * 10) + 1, auctionID, function(){
                 setTimeout(function(){
                     mongo.getAuctionDetails(auctionID,outputCallback)

                 },1000)
             });
        });

    mongo.getBidHistory(UID,outputCallback);

    mongo.searchAuctions("lawn",outputCallback)

    mongo.getUserOpenAuctions("google:115290454625517269520",outputCallback)
    mongo.getUserAuctionHistory("google:115290454625517269520",outputCallback)
    mongo.getUserParticipatingOpenAuctions("google:100091013565947923608",outputCallback)


}

setTimeout(function(){
    //wait 1 sec to let mongo connect for testing.
    //in prod it is fine, since no queries should execute immediately
    // testDB();
},1000);