myApp.controller('NavController', ['$scope','Auth', 'AuthData', 
	function($scope, Auth, AuthData) {

$scope.login = AuthData.login;
$scope.logout = AuthData.logout;

}]);

myApp.component('navigation', {
  templateUrl: 'components/navbar.view.html',
  controller: 'NavController'
});