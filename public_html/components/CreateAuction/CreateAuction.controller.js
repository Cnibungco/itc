myApp.controller('CreateAuctionController', ['$scope', 'CreateAuctionService', 'AuthData', '$http',
    function ($scope, CreateAuctionService, AuthData, $http) {
        $scope.title = "Create Auction";
        $scope.formInput = {};
        $scope.isReady = true;
        $scope.imageURL = "";
        $scope.submit = function () {
            if($scope.isReady){
                CreateAuctionService.createAuction($scope.formInput.title,
                    $scope.formInput.description,$scope.formInput.startingPrice,
                    $scope.imageURL);
            } else {
                alert("Please allow your image to upload");
            }
        }
        function EL(id) { return document.getElementById(id); } // Get el by ID helper function
    
        function readFile() {
            $scope.isReady = false;
            if (this.files && this.files[0]) {
                var FR= new FileReader();
                FR.onload = function(e) {
                    uploadImage(e.target.result, function(imageURL){
                        $scope.isReady = true;
                        $scope.imageURL = imageURL
                    });
                };
                FR.readAsDataURL( this.files[0] );
            }
        }
        EL("img").addEventListener("change", readFile, false);
        var uploadImage = function(imageBase64, callback){
            uploadToImgur(imageBase64)
                .then(function successCallback(response) {
                    console.log(response);
                    var imgLink = response.data.data.link;
                    callback(imgLink);
                }, function errorCallback(response) {
                    console.log("Error");
                    console.log(response)
                });
        }
    
        var uploadToImgur = function (imageBase64) {
            return $http({
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                    Authorization: "Client-ID cc68d31a7733d0c", // THIS might work
                    Accept: "application/json"
                },
                data: {
                    image: imageBase64.replace(/.*,/, ''),
                    type: 'base64'
                }
            })
        }
        $scope.getAuction = CreateAuctionService.getAuction;
    }
]);