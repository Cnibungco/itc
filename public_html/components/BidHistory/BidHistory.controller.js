myApp.controller('BidHistoryController', ['$scope', 'BidHistoryService', 'MeService', function($scope, BidHistoryService, MeService) {
    $scope.title = "BidHistory";
    MeService.addCallback(BidHistoryService.loadBidHistory);
    $scope.bidHistory = BidHistoryService.getBidHistory;
}]);
