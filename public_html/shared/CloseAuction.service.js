myApp.service("CloseAuctionService", function (mySocket, AuctionDetailsService) {
    var service = this;
    this.closeAuction = function(){
        AuctionDetailsService.addCallback(service.closeAuctionCallback);
    }
    this.closeAuctionCallback = function(){
        var auctionID = AuctionDetailsService.getResult()._id;
        var callback = function(result){
            service.result = result;
            mySocket.removeListener("CloseAuction", callback)
        }
        mySocket.emit("CloseAuction", auctionID);
        mySocket.on("CloseAuction",callback)
    }
})