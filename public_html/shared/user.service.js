myApp.service("UserService", function(mySocket){
	service = this;

	this.user = {};

	this.setID = function(uid){
		callback = function(data){
			if(data == null){
				alert("Could not find user: " + service.uid);
			} else {
				service.user = data;
			}
			mySocket.removeListener("getUserInfo", callback);
		}
		mySocket.emit("getUserInfo", uid);
		mySocket.on("getUserInfo", callback);
	}
	this.getUser = function() {
		return service.user;
	}
})