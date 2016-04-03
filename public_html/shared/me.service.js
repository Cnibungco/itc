myApp.service("MeService", function(mySocket){
	service = this;
	this.uid = "";
	this.username = "";
	this.bids = [];
	this.auctions = [];
	this.comments = [];

	this.setID = function(id,username){
		callback = function(data){
			if(data == null){
				alert("Could not find user: " + service.uid);
			} else {
				service.username = data.username;
				service.bids = data.bids;
				service.auctions = data.auctions; 
				service.comments = data.comments;
			}
			mySocket.removeListener("login", callback);
		}
		mySocket.emit("login", {uid:id,username: username});
		mySocket.on("login", callback);
		service.uid = id;
	}
	this.getUId = function(){
		return service.uid;
	}
	this.getUsername = function(){
		return service.username;
	}
	this.getBids = function(){
		return service.bids;
	}
	this.getAuctions = function(){
		return service.auctions;
	}
	this.getComments = function(){
		return service.comments;
	}
	// this.getBidHistory = function(){
	// 	mySocket.emit("getBidHistory", service.uid);
	// 	mySocket.on("getBidHistory", )
	// }
})