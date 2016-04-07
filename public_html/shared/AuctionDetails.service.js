myApp.service("AuctionDetailsService", function(mySocket){
	var service = this;
	this.result = {};
	this.callbacks = [];

	this.getAuctionDetails = function(auctionID){
		if(auctionID == "" || auctionID == null) return;
		var callback = function(data){
			service.result = data;
			service.callbacks.forEach(function (obj) {
				obj();
			})
			service.callbacks = [];
			mySocket.removeListener("getAuctionDetails", callback);
		}
		mySocket.emit("getAuctionDetails",auctionID);
		mySocket.on("getAuctionDetails",callback);
		service.auctionID = auctionID;
	}
	this.getResult = function(){
		return service.result;
	}
	this.addCallback = function (callback){
		if($.isEmptyObject(service.result)){
			service.callbacks.push(callback);
		} else {
			callback();
		}
	}
	this.isClosed = function () {
		if($.isEmptyObject(service.result)) return false;
		return !service.result.isOpen;
	}
	this.setAuctionDetails = function (auction) {
		service.result = auction;
		console.log(service.result);
	}
})