myApp.service("NewAuctionListenerService", function(mySocket){
	var cb;
	this.listen = function(callback){
		mySocket.emit("startNewAuctionListener");
		mySocket.on("newAuction",callback);
		cb = callback;
	}
	this.stop = function(){
		mySocket.emit("stopNewAuctionListener");
		mySocket.removeListener("newAuction",cb);
	}
})