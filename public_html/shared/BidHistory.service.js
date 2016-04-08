myApp.service("BidHistoryService", function(mySocket, MeService){
	var service = this;
	this.uid = "";
	this.bidHistory = [];
	this.loaded = false;
	this.callbacks = [];

	this.loadBidHistory = function(){
		var uid = MeService.getUId()
		var callback = function(data){
			service.bidHistory = data;
			service.loaded = true;
			service.callbacks.forEach(function (obj) {
				obj();
			})
			service.callbacks = [];
			mySocket.removeListener("getBidHistory", callback);
		}
		mySocket.emit("getBidHistory",uid);
		mySocket.on("getBidHistory",callback);
		service.uid = uid;
	}
	this.addCallback = function(callback){
		if(service.loaded){
			callback();
		} else {
			service.callbacks.push(callback);
		}
	}
	this.getUId = function(){
		return service.uid;
	}
	this.getBidHistory = function(){
		return service.bidHistory;
	}
})