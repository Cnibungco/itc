myApp.service("AuctionListenerService", function(mySocket){
	var cb; 
	this.listen = function(auctionID, callback){
		mySocket.emit("startAuctionListener",auctionID)
		mySocket.on("newAuction",callback);
		cb = callback;
	}
	this.stop = function(auctionID){
		mySocket.emit("stopAuctionListener",auctionID);
		mySocket.removeListener("newAuction", cb);
	}
})