myApp.controller('AuctionDetailsController', ['$scope', 'AuctionDetailsService','$stateParams', 'CreateBidService', 
    function($scope, AuctionDetailsService, $stateParams, CreateBidService) {
    $scope.title = "AuctionDetails";
   	AuctionDetailsService.getAuctionDetails($stateParams.auctionID);
    //replace with obj returned by server
    $scope.getAuction = AuctionDetailsService.getResult;
    // CreateBidService.createNewBid(35,"5701ccde13cb519f50e4bbc3"); this will make a bid


}]);