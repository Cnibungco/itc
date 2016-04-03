myApp.service("AuthData", function(Auth, MeService) {
    service = this;
    this.data;

    this.login = function (authMethod) {
        Auth.$authWithOAuthRedirect(authMethod).then(function (authData) {
        }).catch(function (error) {
            if (error.code === 'TRANSPORT_UNAVAILABLE') {
                Auth.$authWithOAuthPopup(authMethod).then(function (authData) {
                });
            } else {
                console.log(error);
            }
        });
    };

    this.logout = function () {
        var ref = Auth;
        ref.$unauth();
    };

    this.getAuthData = function(){
        return this.data;
    };

    Auth.$onAuth(function (authData) {
        if (authData === null) {
            console.log('Not logged in yet');
        } else {
            MeService.setID(authData.uid, authData.google.displayName);
            console.log('Logged in as', authData.uid);
            this.data = authData;
            console.log(this.data);
        }
    })
});