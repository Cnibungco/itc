myApp.controller('DrawerController', ['$scope', 'MeService', function($scope, MeService) {
	$scope.username = MeService.getUsername;
}]);

myApp.component('drawer', {
  templateUrl: 'components/drawer.view.html',
  controller: 'DrawerController'
});