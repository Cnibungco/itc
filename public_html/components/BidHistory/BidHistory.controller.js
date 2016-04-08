myApp.controller('BidHistoryController', ['$scope', 'BidHistoryService', 'MeService', "MongoTimeFactory", 
    function($scope, BidHistoryService, MeService, MongoTimeFactory) {
        $scope.title = "Bid History";
        MeService.addCallback(BidHistoryService.loadBidHistory);
        $scope.bidHistory = BidHistoryService.getBidHistory;
        $scope.time = function(bidID){
            return MongoTimeFactory(bidID).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        }
        $scope.date = function(bidID){
            return MongoTimeFactory(bidID).toLocaleDateString()
        }
    }
]);
