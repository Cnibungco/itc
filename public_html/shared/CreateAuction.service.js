myApp.service("CreateAuctionService", function(mySocket, $state){
	var service = this;
	this.auction = {};
	this.createAuction = function(title,description,startingPrice, imageURL){

		console.log(title + "asdas");
		var callback = function(data){
			service.auction = data;
			mySocket.removeListener("createNewAuction", callback);
			var result = { auctionID: service.auction._id};
			$state.go('AuctionDetails', result);
		}
		mySocket.emit("createNewAuction",{
			title: title,
			description: description,
			startingPrice: startingPrice,
			imageURL: imageURL
		});
		mySocket.on("createNewAuction",callback);
	}
	this.getAuction = function(){
		return service.auction;
	}
})
