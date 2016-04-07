myApp.service("AuctionListenerService", function(mySocket, AuctionDetailsService){
	var service = this;
	this.callback = function(){};
	this.listen = function(auctionID){
		service.callback = function(auction){
			console.log("hi", auction);
			AuctionDetailsService.setAuctionDetails(auction);
		}
		mySocket.emit("startAuctionListener",auctionID)
		mySocket.on("AuctionUpdate", service.callback);
	}
	this.stop = function(auctionID){
		mySocket.emit("stopAuctionListener",auctionID);
		mySocket.removeListener("AuctionUpdate", service.callback);
	}
})