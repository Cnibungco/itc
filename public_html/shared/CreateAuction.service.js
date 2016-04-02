myApp.service("CreateAuctionService", function(mySocket){
	service = this;

	this.title = "";
	this.description = "";
	this.startingAmount = "";
	this.auctionID = "";

	this.createAuction = function(title,description,startingAmount){
		callback = function(data){
			service.auctionID = data._id;
		}
		mySocket.emit("createNewAuction",{
			title: title,
			description: description,
			startingAmount: startingAmount
		});
		mySocket.on("createNewAuction",callback);
		service.title = title;
		service.description = description; 
		service.startingAmount = startingAmount;
	}
	this.getTitle = function(){
		return service.title;
	}
	this.getDescription = function(){
		return service.description;
	}
	this.getStartingAmount = function(){
		return service.startingAmount;
	}
	this.getAuctionID = function(){
		return service.auctionID;
	}
})