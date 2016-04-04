myApp.controller('AuctionDetailsController', ['$scope', 'AuctionDetailsService', function($scope, AuctionDetailsService) {

    $scope.title = "AuctionDetails";
   	AuctionDetailsService.getAuctionDetails("570193220a7c0198fa8e242e");
    //replace with obj returned by server
    $scope.auction = function(){
    	return AuctionDetailsService.getResult();
    }



}]);