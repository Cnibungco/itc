 myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "components/home/home.view.html",
      controller: "HomeController"
    })
    .state('state1', {
      url: "/state1",
      templateUrl: "state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "state1.list.html",
      controller: function($scope, mySocket) {
        mySocket.on('hello', function () {
          console.log("HELLO");
        });
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "state2.html"
    })
    .state('state2.list', {
      url: "/list",
        templateUrl: "state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      })
    });