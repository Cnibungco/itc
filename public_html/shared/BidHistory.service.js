myApp.service("BidHistoryService", function(mySocket, MeService){
	service = this;
	this.uid = "";
	this.bidHistory = [];

	this.loadBidHistory = function(){
		var uid = MeService.getUId()
		callback = function(data){
			service.bidHistory = data;
		}
		mySocket.emit("getBidHistory",uid);
		mySocket.on("getBidHistory",callback);
		service.uid = uid;
	}
	this.getUId = function(){
		return service.uid;
	}
	this.getBidHistory = function(){
		return service.bidHistory;
	}
})