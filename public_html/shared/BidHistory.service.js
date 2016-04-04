myApp.service("BidHistoryService", function(mySocket){
	service = this;
	this.uid = "";
	this.bidHistory = [];

	this.loadBidHistory = function(uid){
		callback = function(data){
			service.bidHistory = data;
			console.log(data);
		}
		console.log(uid);
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