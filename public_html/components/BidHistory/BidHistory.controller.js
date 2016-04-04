myApp.controller('BidHistoryController', ['$scope', 'BidHistoryService', function($scope, BidHistoryService) {
    $scope.title = "BidHistory";
    $scope.text = 'Generic Service Title';
    $scope.data = "data";
    $scope.search = function(uid){
    	BidHistoryService.loadBidHistory(uid);
    }

    $scope.bidHistory = function(){
    	return BidHistoryService.getBidHistory();
    }
    $scope.search("104");
}]);
