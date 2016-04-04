myApp.controller('BidHistoryController', ['$scope', 'BidHistoryService', function($scope, BidHistoryService) {
    $scope.title = "BidHistory";
    $scope.search = function(uid){
    	BidHistoryService.loadBidHistory("104");
    }

    $scope.bidHistory = function(){
    	return BidHistoryService.getBidHistory();
    }
    $scope.search("104");
}]);
