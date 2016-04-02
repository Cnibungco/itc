myApp.service("GetBidHistoryService", function(mySocket){
	service = this;
	this.uid = "";
	this.bids = [];

	this.getBidHistory = function(uid){
		callback = function(data){
			bids = data;
		}
		mySocket.emit("getBidHistory",uid);
		mySocket.on("getBidHistory",callback);
		service.uid = uid;
	}
	this.getUId = function(){
		return service.uid;
	}
	this.getBids = function(){
		return service.bids;
	}
})