myApp.service("MeService", function(mySocket){
	service = this;
	this.uid = "asdasd";
	this.username = "";
	this.bids = "";
	this.auctions = [];
	this.comments = [];

	this.callback = function(data){
		if(data == null){
			alert("Could not find user: " + service.uid);
		} else {	
			service.username = data.username;
			service.bids = data.bids;
			service.auctions = data.auctions; 
			service.comments = data.comments;
		}
		mySocket.removeListener("getUserInfo", service.callback);
	}
	this.setID = function(id){
		mySocket.emit("getUserInfo", id);
		mySocket.on("getUserInfo", service.callback);
		service.uid = id;
	}
})