myApp.service("BidHistoryService", function(mySocket, MeService){
	var service = this;
	this.uid = "";
	this.bidHistory = [];

	this.loadBidHistory = function(){
		var uid = MeService.getUId()
		var callback = function(data){
			service.bidHistory = data;
			mySocket.removeListener("getBidHistory", callback);
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