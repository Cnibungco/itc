myApp.factory('Auth', function($firebaseAuth) {
    var endPoint = "https://itcsoftcom2016.firebaseio.com" ;
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  });