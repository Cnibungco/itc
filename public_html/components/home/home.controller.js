myApp.controller('HomeController', ['$scope', 'mySocket', 'RequestFactory', 'MeService','Auth', 'GetBidHistoryService', 'CreateBidService' , 'CreateAuctionService' , 'NewAuctionListenerService' , 
	function($scope, mySocket,RequestFactory,MeService, Auth, GetBidHistoryService, CreateBidService, CreateAuctionService, NewAuctionListenerService) {
  	// $scope.hist.getBidHistory("123");
  	// $scope.createBid = CreateBidService;

  	// $scope.createBid.createNewBid("123",12313,"1231");

    $scope.items = ["A", "List", "From", "HomeCtrl"];

    $scope.login = function(authMethod) {
    Auth.$authWithOAuthRedirect(authMethod).then(function(authData){
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
      MeService.setID(authData.uid, authData.google.displayName); 
      console.log('Logged in as', authData.uid);
         
    }
    // This will display the user's name in our view
    $scope.authData = authData;
  });
    $scope.logout = function(){
        var ref = Auth;
        ref.$unauth();
    };

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
