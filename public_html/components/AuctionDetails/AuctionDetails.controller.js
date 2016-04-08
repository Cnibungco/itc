myApp.controller('AuctionDetailsController', ['$scope', 'AuctionDetailsService','$stateParams', 
    'CreateBidService', 'AuctionListenerService', 'ChooseBidService', 'MeService', 'SetFeedbackForClientService',
    'SetFeedbackForProviderService', 'MongoTimeFactory', 'AuctionRoleService', "$state", 'CloseAuctionService',
    function($scope, AuctionDetailsService, $stateParams, CreateBidService, AuctionListenerService, ChooseBidService,
             MeService, SetFeedbackForClientService, SetFeedbackForProviderService, MongoTimeFactory, AuctionRoleService,
             $state, CloseAuctionService) {
        $scope.title = "AuctionDetails";
        AuctionDetailsService.getAuctionDetails($stateParams.auctionID);
        $state.get('AuctionDetails').onExit = AuctionListenerService.stop($stateParams.auctionID);
        //replace with obj returned by server
        $scope.getAuction = AuctionDetailsService.getResult;
        $scope.chooseBid = function(bidID){
            ChooseBidService.chooseBid(MeService.getUId(), AuctionDetailsService.getResult()._id,bidID);
        }
        $scope.createBid = function(){
            CreateBidService.createNewBid($scope.bidAmount, $stateParams.auctionID);
            $('#bidForm')[0].reset();
        }
        $scope.didFinish = AuctionDetailsService.didFinish;
        $scope.isLoggedIn = MeService.loggedIn;
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
            SetFeedbackForProviderService.setFeedback($scope.providerComment, $scope.providerRating);
        }
        $scope.setFeedbackForProvider = function () {
            SetFeedbackForClientService.setFeedback($scope.clientComment, $scope.clientRating);
        }
        $scope.decodeTime = MongoTimeFactory;
        $scope.closeAuction = CloseAuctionService.closeAuction;
        $scope.closedText = function(){
            if($scope.isClosed()){
                return "(Auction Closed)";
            }
            return "";
        }
        $scope.isReady = function(){
            if($.isEmptyObject(AuctionDetailsService.getResult())){
                return false;
            }
            return true;
        }
        $scope.clientHasFeedback = function(){
            return AuctionDetailsService.getResult().feedbackForClient == null;
        }
        $scope.providerHasFeedback = function () {
            return AuctionDetailsService.getResult().feedbackForProvider == null;
        }
    }
]);