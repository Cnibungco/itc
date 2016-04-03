myApp.controller('CreateAuctionController', ['$scope', 'CreateAuctionService', 'AuthData', function($scope, CreateAuctionService,AuthData) {

   $scope.title = "CreateAuction";
   
   $scope.formInput = {};

   $scope.submit = function(){
   		CreateAuctionService.createAuction($scope.formInput.title,$scope.formInput.description,$scope.formInput.startingPrice);
	}
}]);