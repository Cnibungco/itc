myApp.controller('NavController', ['$scope','Auth', 'AuthData', function($scope, Auth, AuthData) {

	$scope.log = AuthData.log
	$scope.logged = AuthData.loggedIn;
	$scope.button = function(){
		return $scope.logged() ? 'LOGOUT' : 'LOGIN';
	}
}]);

myApp.component('navigation', {
  templateUrl: 'components/Navbar.view.html',
  controller: 'NavController'
});