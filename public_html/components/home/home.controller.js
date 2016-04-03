myApp.controller('HomeController', ['$scope', 'mySocket', 'MeService','Auth', 'AuthData', 'SearchService', 
	function($scope, mySocket,MeService, Auth, AuthData, SearchService) {

    $scope.items = ["A", "List", "From", "HomeCtrl"];
    $scope.title = "Home";


    $scope.login = AuthData.login;

    //$scope.authData = AuthData.getAuthData();

    $scope.logout = AuthData.logout;

    $scope.me = MeService;

    $scope.formInput;

    $scope.search = function(){
    	SearchService.search($scope.formInput.searchText);
    	$scope.auctionSearchResults = SearchService.results;
    }

}]);
