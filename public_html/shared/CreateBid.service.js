myApp.service("CreateBidService", function(mySocket){
	service = this;

	this.bidAmount = 0;
	this.auctionID = "";
	this.bidID = "";

	this.createNewBid = function(bidAmount,auctionID){
		callback = function(data){
			service.bidID = data._id;
		}
		mySocket.emit("createNewBid",{
			bidAmount: bidAmount,
			auctionID: auctionID
		});
		mySocket.on("createNewBid",callback);
		service.bidAmount = bidAmount;
		service.auctionID = auctionID;
	}
	this.getBidAmount = function(){
		return service.bidAmount;
	}
	this.getAuctionID = function(){
		return service.auctionID;
	}
	this.getBidID = function(){
		return service.bidID;
	}
})