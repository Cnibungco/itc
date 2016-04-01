myApp.factory('requests', function (mySocket) {
	return {
		getBidHistory: function(uid, callback){
			mySocket.emit("bidHistory", uid);
			mySocket.on("bidHistory", function(obj){
				callback(obj);
			});
		}
	}
});
