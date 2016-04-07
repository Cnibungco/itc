myApp.service("AuctionsWonService", function(mySocket, MeService){
    var service = this;
    this.auctionsWon = {};
    this.loadAuctionsWon = function(){
        var uid = MeService.getUId();
        if(uid == null || uid == ""){
            console.log("Blank uid, cannot load Auctions won");
            return;
        }
        var callback = function(data){
            service.auctionsWon = data;
            mySocket.removeListener("getAuctionsWon", callback);
        }
        mySocket.emit("getAuctionsWon",uid);
        mySocket.on("getAuctionsWon",callback);
    }
    this.getAuctionsWon = function(){
        return service.auctionsWon;
    }
})