myApp.service("CreateBidService", function(mySocket){
	var service = this;
	this.bidID = "";

	this.createNewBid = function(bidAmount,auctionID){
		var callback = function(data){
			service.bidID = data._id;
			mySocket.removeListener("createNewBid", callback);
		}
		mySocket.emit("createNewBid",{
			bidAmount: bidAmount,
			auctionID: auctionID
		});
		mySocket.on("createNewBid",callback);
	}
	this.getBidID = function(){
		return service.bidID;
	}
})