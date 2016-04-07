myApp.service("ChooseBidService", function(mySocket){
	service = this;
	this.result = {};

	this.chooseBid = function(userID, auctionID, bidID){
		console.log(userID,auctionID,bidID);
		if(auctionID == "" || auctionID == null) return;
		callback = function(data){
			service.result = data;
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