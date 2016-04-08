myApp.controller('CreateAuctionController', ['$scope', 'CreateAuctionService', 'AuthData', function($scope, CreateAuctionService,AuthData) {

   $scope.title = "Create Auction";
   
   $scope.formInput = {};

   $scope.submit = function(){
   		CreateAuctionService.createAuction($scope.formInput.title,$scope.formInput.description,$scope.formInput.startingPrice);
	}
	$scope.getAuction = CreateAuctionService.getAuction;

    function uploadImage(imageBase64, callback){
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

    function uploadToImgur(imageBase64) {
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
}]);