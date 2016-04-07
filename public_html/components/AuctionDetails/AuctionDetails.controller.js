myApp.controller('AuctionDetailsController', ['$scope', 'AuctionDetailsService','$stateParams', 
    'CreateBidService', 'AuctionListenerService', 'ChooseBidService', 'MeService', 'SetFeedbackForClientService',
    'SetFeedbackForProviderService', 'MongoTimeFactory', 'AuctionRoleService',
    function($scope, AuctionDetailsService, $stateParams, CreateBidService, AuctionListenerService, ChooseBidService,
             MeService, SetFeedbackForClientService, SetFeedbackForProviderService, MongoTimeFactory, AuctionRoleService) {
        
        $scope.title = "AuctionDetails";
        AuctionDetailsService.getAuctionDetails($stateParams.auctionID);
        AuctionListenerService.listen($stateParams.auctionID);
        //replace with obj returned by server
        $scope.getAuction = AuctionDetailsService.getResult;
        $scope.chooseBid = function(bidID){
            ChooseBidService.chooseBid(MeService.getUId(), AuctionDetailsService.getResult()._id,bidID);
        }
        $scope.createBid = function(bidAmount, auctionID){
            CreateBidService.createNewBid(bidAmount, auctionID);
        }
        $scope.isClient = AuctionRoleService.isClient;
        $scope.isProvider = AuctionRoleService.isProvider;
        $scope.isClosed = AuctionDetailsService.isClosed;
        AuctionDetailsService.addCallback(function () {
            $scope.providerComment = AuctionDetailsService.getResult().feedbackForClient.comment;
            $scope.providerRating = AuctionDetailsService.getResult().feedbackForClient.rating;
            $scope.clientComment = AuctionDetailsService.getResult().feedbackForProvider.comment;
            $scope.clientRating = AuctionDetailsService.getResult().feedbackForProvider.rating;
        });
        $scope.setFeedbackForClient = function () {
            SetFeedbackForClientService.setFeedback($scope.providerComment, $scope.providerRating);
        }
        $scope.setFeedbackForProvider = function () {
            SetFeedbackForProviderService.setFeedback($scope.clientComment, $scope.clientRating);
        }
        $scope.decodeTime = MongoTimeFactory;
    }
]);