myApp.service("ChooseBidService", function(mySocket){
	var service = this;
	this.result = {};

	this.chooseBid = function(userID, auctionID, bidID){
		if(auctionID == "" || auctionID == null) return;
		var callback = function(data){
			service.result = data;
			mySocket.removeListener("ChooseBid", callback);
		}
		mySocket.emit("ChooseBid",{
			userID: userID,
			auctionID: auctionID,
			bidID: bidID
		});
		mySocket.on("ChooseBid",callback);
	}
	this.getResult = function(){
		return service.result;
	}
})