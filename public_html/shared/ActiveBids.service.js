myApp.service("ActiveBidsService",function (mySocket, MeService) {
    var service = this;
    this.result = {};
    this.getActiveBids = function () {
        var uid = MeService.getUId();
        var callback = function (result) {
            service.result = result;
            mySocket.removeListener("getActiveBids", callback);
        }
        mySocket.emit("getActiveBids",uid);
        mySocket.on("getActiveBids",callback);
    }
    this.getResult = function () {
        return service.result;
    }
})