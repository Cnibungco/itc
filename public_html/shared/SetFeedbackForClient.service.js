myApp.service("SetFeedbackForClientService", function(mySocket, AuctionDetailsService){
    var service = this;

    this.result;

    this.setFeedback = function(comment, rating){
        var auctionID = AuctionDetailsService.getResult()._id;
        var callback = function(data){
            service.bidID = data._id;
            mySocket.removeListener("SetFeedbackForClient", callback);
        }
        mySocket.emit("SetFeedbackForClient",{
            auctionID: auctionID,
            comment: comment,
            rating: rating
        });
        mySocket.on("SetFeedbackForClient",callback);
    }
    this.getResult = function () {
        return service.result;
    }
})