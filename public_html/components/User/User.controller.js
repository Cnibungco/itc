myApp.controller('UserController', ['$scope','$stateParams', 'UserService', 
    function($scope, $stateParams, UserService) {
        $scope.title = "User";
        UserService.setID($stateParams.userID);
        //TODO: use $stateParams.userID to query for user data
        $scope.user = UserService.getUser;
        $scope.uid = UserService.getUId;
    $scope.profileImageURL = UserService.getProfileImageURL;
    }]);