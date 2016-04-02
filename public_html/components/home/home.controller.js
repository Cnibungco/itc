myApp.controller('HomeController', ['$scope', 'mySocket', 'RequestFactory', 'MeService', function($scope, mySocket,RequestFactory,MeService) {

    $scope.title = "Home";
    $scope.me = MeService.setID(23123);

    mySocket.on('hello', function () {
        console.log("WASSUP");
    });

    $scope.items = ["A", "List", "From", "HomeCtrl"];

}]);