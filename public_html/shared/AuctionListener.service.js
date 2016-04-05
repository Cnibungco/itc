myApp.service("AuctionListenerService", function(mySocket, AuctionDetailsService){
	var service = this;
	this.callback = function(){}; 
	this.listen = function(auctionID){
		service.callback = function(data){
            console.log(AuctionDetailsService.getResult())
			AuctionDetailsService.getResult().bidHistory.push(data);
		}
		mySocket.emit("startAuctionListener",auctionID)
		mySocket.on("newBid", service.callback);
	}
	this.stop = function(auctionID){
		mySocket.emit("stopAuctionListener",auctionID);
		mySocket.removeListener("newBid", service.callback);
	}
})