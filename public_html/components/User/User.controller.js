myApp.controller('UserController', ['$scope','$stateParams',
    function($scope, $stateParams) {
        $scope.title = "User";

        //TODO: use $stateParams.userID to query for user data
        console.log("USER ID",$stateParams.userID)
    }]);