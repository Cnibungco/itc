myApp.service("CreateAuctionService", function(mySocket, $state){
	var service = this;
	this.auction = {};
	this.createAuction = function(title,description,startingPrice){
		var callback = function(data){
			service.auction = data;
			mySocket.removeListener("createNewAuction", callback);
			var result = { auctionID: service.auction._id};
			$state.go('AuctionDetails', result);
		}
		mySocket.emit("createNewAuction",{
			title: title,
			description: description,
			startingPrice: startingPrice
		});
		mySocket.on("createNewAuction",callback);
	}
	this.getAuction = function(){
		return service.auction;
	}
	var uploadImage = function(imageBase64, callback){
		uploadToImgur(imageBase64)
			.then(function successCallback(response) {
				console.log(response);
				var imgLink = response.data.data.link;
				callback(imgLink);
			}, function errorCallback(response) {
				console.log("Error");
				console.log(response)
			});
	}

	var uploadToImgur = function (imageBase64) {
		return $http({
			method: 'POST',
			url: 'https://api.imgur.com/3/image',
			headers: {
				Authorization: "Client-ID cc68d31a7733d0c", // THIS might work
				Accept: "application/json"
			},
			data: {
				image: imageBase64.replace(/.*,/, ''),
				type: 'base64'
			}
		})
	}
})
