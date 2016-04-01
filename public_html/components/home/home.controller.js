myApp.controller('HomeController', ['$scope', 'mySocket', function($scope, mySocket) {

    mySocket.on('hello', function () {
        console.log("WASSUP");
    });

    $scope.items = ["A", "List", "From", "HomeCtrl"];

}]);