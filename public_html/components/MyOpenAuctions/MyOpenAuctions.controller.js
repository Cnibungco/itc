myApp.controller('MyOpenAuctionsController', ['$scope', 'MeService', function($scope, MeService) {

    $scope.title = "Open Auctions";
    MeService.loadOpenAuctions();
    $scope.openAuctions = function(){
    	return MeService.getOpenAuctions();
	}
}]);