myApp.service("CloseAuctionService", function (mySocket) {
    var service = this;

    this.closeAuciton = function(auctionId){
        var callback = function(result){
            service.result = result;
            mySocket.removeListener("CloseAuction", callback)
        }
        mySocket.emit("CloseAuction", auctionId);
        mySocket.on("CloseAuction",callback)
    }
})