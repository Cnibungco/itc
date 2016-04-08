myApp.controller('CreateAuctionController', ['$scope', 'CreateAuctionService', 'AuthData', function($scope, CreateAuctionService,AuthData) {

   $scope.title = "Create Auction";
   
   $scope.formInput = {};

   $scope.submit = function(){
   		CreateAuctionService.createAuction($scope.formInput.title,$scope.formInput.description,$scope.formInput.startingPrice);
	}
	$scope.getAuction = CreateAuctionService.getAuction;
}]);