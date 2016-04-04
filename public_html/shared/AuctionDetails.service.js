myApp.service("AuctionDetailsService", function(mySocket){
	service = this;
	this.auctionID = "";
	this.result = {};

	this.getAuctionDetails = function(auctionID){
		if(auctionID == "") return;
		callback = function(data){
			service.result = data;
		}
		mySocket.emit("getAuctionDetails",auctionID);
		mySocket.on("getAuctionDetails",callback);
		service.auctionID = auctionID;
	}
	this.getAuctionID = function(){
		return service.auctionID;
	}
	this.getResult = function(){
		return service.result;
	}
})