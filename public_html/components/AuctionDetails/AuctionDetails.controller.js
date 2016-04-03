myApp.controller('AuctionDetailsController', ['$scope', function($scope) {

    $scope.title = "AuctionDetails";

    //replace with obj returned by server
    $scope.auction = {hello:"world", title:"a title", description:"a description"};



}]);