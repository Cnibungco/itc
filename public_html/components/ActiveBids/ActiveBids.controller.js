myApp.controller('ActiveBidsController', ['$scope', 'ActiveBidsService','MeService',
   function($scope, ActiveBidsService, MeService) {

      $scope.title = "Active Bids";
      MeService.addCallback(ActiveBidsService.getActiveBids);
      $scope.auctions = ActiveBidsService.getResult;
   }
]);