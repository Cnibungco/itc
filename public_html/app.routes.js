 myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('Home', {
        url: "/",
        templateUrl: "components/Home/home.view.html",
        controller: "HomeController"
    })
    .state('ActiveBids', {
        url: "/ActiveBids",
        templateUrl: "components/ActiveBids/ActiveBids.view.html",
        controller: "ActiveBidsController",
        onEnter: function(){
            $('#StateLabel').html('Active Bids');
        }
    })
    .state('AuctionDetails', {
        url: "/AuctionDetails/:auctionID",
        templateUrl: "components/AuctionDetails/AuctionDetails.view.html",
        controller: "AuctionDetailsController",
        onEnter: function(){
            $('#StateLabel').html('Auction Details');
        }
    })
    .state('BidHistory', {
        url: "/bidHistory",
        templateUrl: "components/BidHistory/BidHistory.view.html",
        controller: "BidHistoryController",
        onEnter: function(){
            $('#StateLabel').html('Bid History');
        }
    })

    .state('MyAuctionHistory', {
        url: "/MyAuctionHistory",
        templateUrl: "components/MyAuctionHistory/MyAuctionHistory.view.html",
        controller: "MyAuctionHistoryController",
        onEnter: function(){
            $('#StateLabel').html('My Closed Auctions');
        }
    })
    .state('MyOpenAuctions', {
        url: "/MyOpenAuctions",
        templateUrl: "components/MyOpenAuctions/MyOpenAuctions.view.html",
        controller: "MyOpenAuctionsController",
        onEnter: function(){
            $('#StateLabel').html('My Open Auctions');
        }
    })
    .state('CreateAuction', {
        url: "/CreateAuction",
        templateUrl: "components/CreateAuction/CreateAuction.view.html",
        controller: "CreateAuctionController",
        onEnter: function(){
            $('#StateLabel').html('Create Auction');
        }
    })
    .state('User', {
        url: "/User/:userID",
        templateUrl: "components/User/User.view.html",
        controller: "UserController",
        onEnter: function(){
            $('#StateLabel').html('View User');
        }
    })
    .state('AuctionsWon', {
        url: "/AuctionsWon",
        templateUrl: "components/AuctionsWon/AuctionsWon.view.html",
        controller: "AuctionsWonController",
        onEnter: function(){
            $('#StateLabel').html('Auctions Won');
        }
    })

    });