myApp.controller('HomeController', ['$scope', 'mySocket', 'RequestFactory', 'MeService','Auth', 'GetBidHistoryService', 'CreateBidService' , 'CreateAuctionService' , 'NewAuctionListenerService' ,'AuthData',
	function($scope, mySocket,RequestFactory,MeService, Auth, GetBidHistoryService, CreateBidService, CreateAuctionService, NewAuctionListenerService, AuthData) {
  	// $scope.hist.getBidHistory("123");
  	// $scope.createBid = CreateBidService;

  	// $scope.createBid.createNewBid("123",12313,"1231");

    $scope.items = ["A", "List", "From", "HomeCtrl"];
    $scope.title = "Home";


    $scope.login = AuthData.login;

    //$scope.authData = AuthData.getAuthData();

    $scope.logout = AuthData.logout;

    $scope.me = MeService;

    $scope.NewAuctionListener = NewAuctionListenerService;
    $scope.CreateAuction = CreateAuctionService;

    setInterval(function(){
		// console.log("hi")
		// $scope.title = "Home";
		// $scope.me = MeService;
		// $scope.hist = GetBidHistoryService;
		// $scope.hist.getBidHistory(MeService.getUId());
		// $scope.CreateAuction.createAuction("myTitle","myDescription",555);
		// console.log("added");
		// $scope.createBid = CreateBidService;
		// $scope.createBid.createNewBid(12313,"1231");
	},2000);
	setTimeout(function(){
		// $scope.NewAuctionListener.listen(function(data){
		// 	console.log(data);
		// });
	},3000);
	

}]);
