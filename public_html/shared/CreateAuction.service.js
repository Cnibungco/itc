myApp.service("CreateAuctionService", function(mySocket){
	service = this;
	this.auction = {};
	this.createAuction = function(title,description,startingPrice){
		callback = function(data){
			service.auction = data;
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