myApp.service("CreateAuctionService", function(mySocket){
	var service = this;
	this.auction = {};
	this.createAuction = function(title,description,startingPrice){
		var callback = function(data){
			service.auction = data;
			mySocket.removeListener("createNewAuction", callback);
		}
		mySocket.emit("createNewAuction",{
			title: title,
			description: description,
			startingPrice: startingPrice
		});
		mySocket.on("createNewAuction",callback);
	}
	this.getAuction = function(){
		return service.auction;
	}
})