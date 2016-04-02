myApp.factory('RequestFactory', function (mySocket) {
	var getUser;
	var getBidHistory;
	var cost;
	var createNewBid;
	return {
		getBidHistory: function(uid){
			var callback = function(obj){
				getBidHistory = obj;
				console.log(obj);
				mySocket.removeListener("getBidHistory",callback);
			};
			mySocket.emit("getBidHistory", uid);
			mySocket.on("getBidHistory", callback);
			return getBidHistory;
		},
		createNewBid: function(uid,cost,aid,callback){
			var callback = function(obj){
				alert("created new bid!!!");
				mySocket.removeListener("createNewBid",callback)
			};
			mySocket.emit("createNewBid", {uid: uid, cost: cost, aid: aid});
			mySocket.on("createNewBid", callback);
			return createNewBid;
		}

	}
});