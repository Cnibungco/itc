myApp.service("AuctionListenerService", function(mySocket, AuctionDetailsService){
	var service = this;
	this.callback = function(){};
	this.listenCallback = function(){
		var auctionID = AuctionDetailsService.getResult()._id;
		service.callback = function(auction){
			AuctionDetailsService.setAuctionDetails(auction);
		}
		mySocket.emit("startAuctionListener",auctionID)
		mySocket.on("AuctionUpdate", service.callback);
	}
	this.stop = function(auctionID){
		mySocket.emit("stopAuctionListener",auctionID);
		mySocket.removeListener("AuctionUpdate", service.callback);
	}
	AuctionDetailsService.addCallback(service.listenCallback);
})