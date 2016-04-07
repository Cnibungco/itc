myApp.service("SetFeedbackForProviderService", function(mySocket, AuctionDetailsService){
    var service = this;

    this.result;

    this.setFeedback = function(comment, rating){
        var auctionID = AuctionDetailsService.getResult()._id;
        var callback = function(data){
            service.bidID = data._id;
            mySocket.removeListener("SetFeedbackForProvider", callback);
        }
        mySocket.emit("SetFeedbackForProvider",{
            auctionID: auctionID,
            comment: comment,
            rating: rating
        });
        mySocket.on("SetFeedbackForProvider",callback);
    }
    this.getResult = function () {
        return service.result;
    }
})