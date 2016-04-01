 myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('Home', {
      url: "/",
      templateUrl: "components/Home/home.view.html",
      controller: "HomeController"
    })
    .state('BidHistory', {
      url: "/bidHistory",
      templateUrl: "components/BidHistory/BidHistory.view.html",
      controller: "BidHistoryController"
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