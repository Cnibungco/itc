myApp.service("AuctionHistoryService", function(mySocket){
	service = this;
	this.uid = "";
	this.auctionHistory = [];

	this.loadAuctionHistory = function(uid){
		callback = function(data){
			service.bidHistory = data;
		}
		mySocket.emit("getAuctionHistory",uid);
		mySocket.on("getAuctionHistory",callback);
		service.uid = uid;
	}
	this.getUId = function(){
		return service.uid;
	}
	this.getAuctionHistory = function(){
		return service.auctionHistory;
	}
})