myApp.service("CreateBidService", function(mySocket){
	service = this;
	this.uid = "";
	this.bidAmount = 0;
	this.auctionID = "";
	this.bidID = "";

	this.createNewBid = function(uid,bidAmount,auctionID){
		callback = function(data){
			service.bidID = data._id;
		}
		mySocket.emit("createNewBid",{
			uid: uid,
			bidAmount: bidAmount,
			auctionID: auctionID
		});
		mySocket.on("createNewBid",callback);
		service.uid = uid;
		service.bidAmount = bidAmount;
		service.auctionID = auctionID;
	}
	this.getUId = function(){
		return service.uid;
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