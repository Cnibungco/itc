myApp.controller('MyAuctionHistoryController', ['$scope',  'AuctionHistoryService', 'MeService', 
	function($scope, AuctionHistoryService, MeService) {

   $scope.title = "MyAuctionHistory";
   MeService.addCallback(AuctionHistoryService.loadAuctionHistory);
   $scope.auctionHistory = AuctionHistoryService.getAuctionHistory;
}]);