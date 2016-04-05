myApp.service("SearchService", function(mySocket){
	service = this;

	this.text = "";
	this.results = [];

	this.search = function(text){
		console.log("searching: " + text);
		callback = function(data){
			service.results = data;
			console.log(service.results);
			mySocket.removeListener("searchAuctions");
		}
		mySocket.emit("searchAuctions", text);
		mySocket.on("searchAuctions",callback);
		service.text = text;
	}
    //AutoPopulate home with some sample results
    this.search("lawn");
	this.getText = function(){
		return service.text;
	}
	this.getResults = function(){
		return service.results;
	}
})