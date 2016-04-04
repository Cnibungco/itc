myApp.controller('AuctionDetailsController', ['$scope', 'AuctionDetailsService','$stateParams',
    function($scope, AuctionDetailsService, $stateParams) {
    $scope.title = "AuctionDetails";
   	AuctionDetailsService.getAuctionDetails($stateParams.auctionID);
    //replace with obj returned by server

    $scope.getAuction = AuctionDetailsService.getResult;




}]);