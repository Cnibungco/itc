myApp.service("SearchService", function(mySocket){
	service = this;

	this.text = "";
	this.result = {};

	this.search = function(text){
		console.log("searching: " + text);
		callback = function(data){
			service.result = data;
			console.log(data);
			mySocket.removeListener("searchAuctions");
		}
		mySocket.emit("searchAuctions", text);
		mySocket.on("searchAuctions",callback);
		service.text = text;
	}
	this.getText = function(){
		return service.text;
	}
	this.getResult = function(){
		return service.result;
	}
})