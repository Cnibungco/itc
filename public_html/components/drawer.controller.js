myApp.controller('DrawerController', ['$scope', 'MeService', function($scope, MeService) {
	$scope.username = MeService.getUsername;
	$scope.uid = MeService.getUId;
}]);

myApp.component('drawer', {
  templateUrl: 'components/drawer.view.html',
  controller: 'DrawerController'
});