myApp.factory('Auth', function($firebaseAuth) {
    var endPoint = "https://scorching-fire-629.firebaseio.com" ;
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  });