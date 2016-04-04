myApp.controller('MyOpenAuctionsController', ['$scope', 'MeService', function($scope, MeService) {

    $scope.title = "MyOpenAuctions";
    MeService.loadOpenAuctions();
    $scope.openAuctions = function(){
    	return MeService.getOpenAuctions();
	}
}]);