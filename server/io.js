var exports = module.exports = {}
var mongo = require("./mongo.js");
var sockets = {};

exports.listen = function(http,io){
  io.on('connection', function(socket){
    var user;
    console.log('Socket "' + socket.id + '" connected');
    sockets[socket.id] = socket;


    socket.on("disconnect", function(){
      console.log('Socket "' + socket.id + '" disconnected');
      delete sockets[socket.id];
    });

    socket.on("createNewBid", function(data){
      mongo.createNewBid(user.uid,data.bidAmount,data.auctionID,function(result){
        socket.emit("createNewBid",result);
        for(key in sockets){
          if(socket.listenAuction[data.auctionID] == true)
          sockets[key].emit("newBid",result);
        }
      });
    });

    socket.on("getUserInfo",function(data){
      mongo.getUserInfo(data.uid, data.username, function(obj){
        if(user == null){ //THIS WILL NOT WORK LATER!!!!! HOW DO WE TELL ITS A LOGIN????
          user = data;
          console.log(user.username + " logged in.");
        } 
        socket.emit("getUserInfo", obj);
      })
    });

    socket.on("createNewAuction",function(data){
      mongo.createNewAuction(user.uid,data.title,data.description,data.startingAmount,function(result){
        socket.emit("createNewAuction",result);
        for(key in sockets){
          if(sockets[key].listenAuctions == true)
            sockets[key].emit("newAuction",result);
        }
      });
    });

    socket.on("getBidHistory",function(uid){
      mongo.getBidHistory(uid,function(result){
        socket.emit("getBidHistory",result);
      });
    });
    socket.on("startNewAuctionListener",function(){
      socket.listenAuctions = true;
    })
    socket.on("stopNewAuctionListener",function(data){
      socket.listenAuctions = false;
    });
    socket.on("startAuctionListener", function(auctionID){
      socket.listenAuction[auctionID] = true;
    });
    socket.on("stopAuctionListener", function(auctionID){
      socket.listenAuction[auctionID] = false;
    });
  });
}