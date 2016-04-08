myApp.controller('DrawerController', ['$scope', 'MeService', function($scope, MeService) {
	$scope.username = MeService.getUsername;
	$scope.uid = MeService.getUId;
    $scope.profileImageURL = MeService.getProfileImageURL;
}]);

myApp.component('drawer', {
  templateUrl: 'components/Drawer.view.html',
  controller: 'DrawerController'
});