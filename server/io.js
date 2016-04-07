var exports = module.exports = {}
var mongo = require("./mongo.js");
var sockets = {};

exports.listen = function(http,io){
  io.on('connection', function(socket){
    var user;
    socket.listenAuction = [];

    console.log('Socket "' + socket.id + '" connected');
    sockets[socket.id] = socket;

    socket.on("disconnect", function(){
      console.log('Socket "' + socket.id + '" disconnected');
      delete sockets[socket.id];
    });

    socket.on("createNewBid", function(data){
      if(user == null){
        console.log("ERROR:: User not logged in.");
        return;
      } 
      mongo.createNewBid(user.uid,data.bidAmount,data.auctionID,function(result){
        socket.emit("createNewBid",result);
        for(key in sockets){
          if(socket.listenAuction[data.auctionID] == true)
          sockets[key].emit("newBid",result);
        }
      });
    });
    socket.on("getActiveBids", function (uid) {
      mongo.getUserParticipatingOpenAuctions(uid,function (data) {
        socket.emit("getActiveBids",data);
      })
    })
    socket.on("searchAuctions",function(text){
      mongo.searchAuctions(text,function(results){

        socket.emit("searchAuctions",results);
      })
    })
    socket.on("getUserInfo",function(uid){
      mongo.getUserInfo(uid, function(obj){
        socket.emit("getUserInfo", obj);
      })
    });
    socket.on("login",function(data){
      mongo.login(data.uid, data.username, function(obj){
        user = data;
        console.log(user.username + " logged in.");
        socket.emit("login", obj);
      })
    });
    socket.on("getUserOpenAuctions", function(){
      if(user == null){
        console.log("ERROR:: User not logged in.");
        return;
      } 
      mongo.getUserOpenAuctions(user.uid,function(auctions){
        socket.emit("getUserOpenAuctions",auctions);
      })
    })
    socket.on("createNewAuction",function(data){
      if(user == null){
        console.log("ERROR:: User not logged in.");
        return;
      } 
      mongo.createNewAuction(user.uid,data.title,data.description,data.startingPrice,function(result){
        socket.emit("createNewAuction",result);
        for(key in sockets){
          if(sockets[key].listenAuctions == true)
            sockets[key].emit("newAuction",result);
        }
      });
    });
    socket.on("getAuctionDetails", function(auctionID){
      mongo.getAuctionDetails(auctionID,function(data){
        socket.emit("getAuctionDetails",data);
      })
    });
    
    socket.on("getBidHistory",function(uid){
      mongo.getBidHistory(uid,function(result){
        socket.emit("getBidHistory",result);
      });
    });
    socket.on("getAuctionHistory", function(uid){
      mongo.getUserAuctionHistory(uid, function(result){
        socket.emit("getAuctionHistory",result);
      });
    });
    socket.on("ChooseBid",function(data){
      mongo.clientChooseBid(data.userID, data.auctionID, data.bidID, function(result){
        socket.emit("ChooseBid", result);
      });
    })
    socket.on("getAuctionsWon", function(uid){
      mongo.getAuctionsWon(uid, function (result) {
        socket.emit("getAuctionsWon", result);
      })
    })
    socket.on("SetFeedbackForClient", function(data){
      mongo.setFeedbackForClient(data.auctionID,data.comment,data.rating,function(result){
        socket.emit("SetFeedbackForClient",result);
      })
    })
    socket.on("SetFeedbackForProvider", function (data) {
      mongo.setFeedbackForProvider(data.auctionID,data.comment,data.rating,function (result) {
        socket.emit("SetFeedbackForProvider", result);
      });
    })
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