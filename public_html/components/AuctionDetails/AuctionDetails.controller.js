myApp.controller('AuctionDetailsController', ['$scope', 'AuctionDetailsService','$stateParams', 
    'CreateBidService', 'AuctionListenerService', 'ChooseBidService', 'MeService', 
    function($scope, AuctionDetailsService, $stateParams, CreateBidService, AuctionListenerService, ChooseBidService, MeService) {
    $scope.title = "AuctionDetails";
   	AuctionDetailsService.getAuctionDetails($stateParams.auctionID);
   	AuctionListenerService.listen($stateParams.auctionID);
    //replace with obj returned by server
    $scope.getAuction = AuctionDetailsService.getResult;
    $scope.chooseBid = function(bidID){
        ChooseBidService.chooseBid(MeService.getUId(), AuctionDetailsService.getResult()._id,bidID);
    }
    $scope.createBid = function(bidAmount, auctionID){
        CreateBidService.createNewBid(bidAmount, auctionID);
    }


}]);