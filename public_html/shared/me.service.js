myApp.service("MeService", function(mySocket){
	service = this;
	this.uid = "asdasd";
	this.username = "";
	this.bids = [];
	this.auctions = [];
	this.comments = [];
	this.bid

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
			mySocket.removeListener("getUserInfo", callback);
		}
		mySocket.emit("getUserInfo", {uid:id,username: username});
		mySocket.on("getUserInfo", callback);
		service.uid = id;
	}
	// this.getBidHistory = function(){
	// 	mySocket.emit("getBidHistory", service.uid);
	// 	mySocket.on("getBidHistory", )
	// }
})