myApp.controller('MyAuctionHistoryController', ['$scope',  'AuctionHistoryService', 'MeService', 
	function($scope, AuctionHistoryService, MeService) {

   $scope.title = "MyAuctionHistory";
   AuctionHistoryService.loadAuctionHistory(MeService.getUId());
   $scope.auctionHistory = AuctionHistoryService.getAuctionHistory;
}]);