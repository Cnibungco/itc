myApp.factory('MongoTimeFactory', [function MongoTimeFactory() {
    return function (_id) {
        var timestamp = _id.toString().substring(0,8)
        return new Date( parseInt( timestamp, 16 ) * 1000 )
    }
}]);