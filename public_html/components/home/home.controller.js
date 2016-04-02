myApp.controller('HomeController', ['$scope', 'mySocket', 'RequestFactory', 'MeService','Auth', function($scope, mySocket,RequestFactory,MeService, Auth) {
    $scope.title = "Home";
  //  $scope.me = MeService.setID(23123);

    mySocket.on('hello', function () {
        console.log("WASSUP");
    });

    $scope.items = ["A", "List", "From", "HomeCtrl"];

    $scope.login = function(authMethod) {
    Auth.$authWithOAuthRedirect(authMethod).then(function(authData) {
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
        });
      } else {
        console.log(error);
      }
    });
  };
    Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
    }
    // This will display the user's name in our view
    $scope.authData = authData;
  });
    $scope.logout = function(){
        var ref = Auth;
        ref.$unauth();
    };
}]);
