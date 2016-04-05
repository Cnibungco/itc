myApp.service("AuctionHistoryService", function(mySocket){
	service = this;
	this.auctionHistory = {};

	this.loadAuctionHistory = function(uid){
		if(uid == null || uid == ""){
			console.log("Blank uid, cannot load Auction History");
			return;
		}
		callback = function(data){
			console.log(data);
			service.auctionHistory = data;
		}
		mySocket.emit("getAuctionHistory",uid);
		mySocket.on("getAuctionHistory",callback);
	}
	this.getAuctionHistory = function(){
		return service.auctionHistory;
	}
})