myApp.controller('NavController', ['$scope','Auth', 'AuthData', function($scope, Auth, AuthData) {

	$scope.log = AuthData.log
	$scope.logged = AuthData.loggedIn;
	$scope.button = function(){
		return $scope.logged() ? 'Logout' : 'Login';
	}
}]);

myApp.component('navigation', {
  templateUrl: 'components/navbar.view.html',
  controller: 'NavController'
});