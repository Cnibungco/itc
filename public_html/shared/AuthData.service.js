myApp.service("AuthData", function(Auth, MeService, $state) {
    var service = this;
    this.data;
    this.loggedIn = false;
    var showDrawer = function(){
        $("#main-container").addClass("mdl-layout--fixed-drawer");
        $("#main-header").find(".mdl-layout__drawer-button").css("visibility", "visible");
    }
    var hideDrawer = function(){
        $("#main-container").removeClass("mdl-layout--fixed-drawer");
        $("#main-header").find(".mdl-layout__drawer-button").css("visibility", "hidden");

    }
    this.login = function () {
        Auth.$authWithOAuthPopup("google", { scope: "email"}).then(function (authData) {
        }).catch(function (error) {
            if (error.code !== 'TRANSPORT_UNAVAILABLE') {
                Auth.$authWithOAuthPopup("google", { scope: "email"}).then(function (authData) {
                });
            } else {
                console.log(error);
            }
        });
    };
    this.logout = function () {
        var ref = Auth;
        ref.$unauth();
        service.loggedIn = false;
    };

    this.getAuthData = function(){
        return this.data;
    };

    Auth.$onAuth(function (authData) {
        if (authData === null) {
            hideDrawer();
            console.log('Not logged in yet');
            if($state.current.name != "AuctionDetails" &&
                $state.current.name != "Home" &&
                $state.current.name != "User"){
                $state.go("Home");
            }
            service.loggedIn = false;
        } else {
            showDrawer();
            MeService.setID(authData.uid, authData.google.displayName, authData.google.profileImageURL, authData.google.email);
            console.log('Logged in as', authData.uid);
            this.data = authData;
            console.log(this.data);
            service.loggedIn = true;
        }
    });
    this.loggedIn = function(){
        return service.loggedIn;
    }
    this.log = function(){
        if(service.loggedIn) service.logout();
        else service.login();
    }
});