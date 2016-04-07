myApp.service("SearchService", function(mySocket){
	var service = this;

	this.results = [];

	this.search = function(text){
		var callback = function(data){
			service.results = data;
			console.log(service.results);
			mySocket.removeListener("searchAuctions");
		}
		mySocket.emit("searchAuctions", text);
		mySocket.on("searchAuctions",callback);
		service.text = text;
	}
	this.getResults = function(){
		return service.results;
	}
})