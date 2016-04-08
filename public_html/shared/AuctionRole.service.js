myApp.service("AuctionRoleService", function(MeService, AuctionDetailsService){
    var service = this;
    this.role = 0;
    MeService.addCallback(function () {
        AuctionDetailsService.addCallback(function () {
            if(MeService.getUId() == AuctionDetailsService.getResult().userID){
                service.role = 1;
            }
            if(AuctionDetailsService.getResult().winner != null){
                console.log(MeService.getUId(),  AuctionDetailsService.getResult().winner._id, "asdas");
                if(MeService.getUId() == AuctionDetailsService.getResult().winner._id)
                    service.role = 2;
            }
        })

    });
    this.isClient = function () {
        return service.role == 1;
    }
    this.isProvider = function () {
        return service.role == 2;
    }
})