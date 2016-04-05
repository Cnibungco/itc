myApp.controller('BidHistoryController', ['$scope', 'BidHistoryService', 'MeService', function($scope, BidHistoryService, MeService) {
    $scope.title = "BidHistory";
	BidHistoryService.loadBidHistory(MeService.getUId());
    $scope.bidHistory = BidHistoryService.getBidHistory;
}]);
