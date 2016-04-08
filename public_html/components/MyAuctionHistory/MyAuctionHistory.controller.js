myApp.controller('MyAuctionHistoryController', ['$scope',  'AuctionHistoryService', 'MeService', 
	function($scope, AuctionHistoryService, MeService) {

   $scope.title = "Auction History";
   MeService.addCallback(AuctionHistoryService.loadAuctionHistory);
   $scope.auctionHistory = AuctionHistoryService.getAuctionHistory;
}]);