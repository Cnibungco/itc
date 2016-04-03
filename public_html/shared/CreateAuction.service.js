myApp.service("CreateAuctionService", function(mySocket){
	service = this;

	this.title = "";
	this.description = "";
	this.startingPrice = "";
	this.auctionID = "";

	this.createAuction = function(title,description,startingPrice){
		callback = function(data){
			service.auctionID = data._id;
		}
		mySocket.emit("createNewAuction",{
			title: title,
			description: description,
			startingPrice: startingPrice
		});
		mySocket.on("createNewAuction",callback);
		service.title = title;
		service.description = description; 
		service.startingPrice = startingPrice;
	}
	this.getTitle = function(){
		return service.title;
	}
	this.getDescription = function(){
		return service.description;
	}
	this.getStartingPrice = function(){
		return service.startingPrice;
	}
	this.getAuctionID = function(){
		return service.auctionID;
	}
})