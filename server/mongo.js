var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var uri = 'mongodb://nodeserver:wewillwin@ds011860.mlab.com:11860/itcsoftcomlab';
var db;
var users_collection;
var bids_collection;
var auctions_collection;

var exports = module.exports = {}

exports.foo = function(){
  console.log("MONGO FOO");
}


exports.getUserInfo = function(userID, callback){
    //users_collection.findOne({ _id: new ObjectId(userID)},
    users_collection.findOne({ _id: userID},
        function(err,result){
            if (err) throw err;
            console.log("===RETRIEVED USER===");
            console.log(result);
            callback(result);
        }
    );
}

exports.createNewUser = function(userID, username, callback){
    var aUser = {
        _id: userID,
        username: username,
        bids: [],
        auctions: [],
        comments: {
        }
    };

    users_collection.insert(aUser, function(err, result){
        if(err) throw err;
        console.log("+++USER CREATED+++");
        var userDocument = result.ops[0];
        callback(userDocument);
    })
};

exports.createNewAuction = function(userID, title, description, startingAmount, callback){
    var auction = {
        title: title,
        description: description,
        userID: userID,
        startingAmount : startingAmount
    };

    auctions_collection.insert(auction, function(err, result){
        if(err) throw err;
        console.log("+++AUCTION CREATED+++");
        var auctionDocument = result.ops[0];
        callback(auctionDocument);

        users_collection.update({_id: userID},{$push: {auctions: auctionDocument._id}}, function(err, added){
            if(err) throw err;
            console.log("Updated user.auctions[] with users new auction");
        });
    })
}

exports.createNewBid = function(userID, bidAmount, auctionID, callback){
    var bid = {
        userID: userID,
        amount : bidAmount,
        auctionID: auctionID
    };

    bids_collection.insert(bid, function(err, result){
        if(err) throw err;
        console.log("+++BID CREATED+++");

        var bidDocument = result.ops[0];
        callback(bidDocument);

        users_collection.update({_id: userID},{$push: {bids: bidDocument._id}}, function(err, added){
            if(err) throw err;
            console.log("Updated user.bids[] with users new bid.");
        });
    })
}

exports.getBidHistory = function(userID, callback){
    var user = {_id: userID};
    users_collection.find(user,{bids: true}).toArray( function(err, result){

        console.log("====Got User Bids====");
        var bids = result[0].bids;
        bids_collection.find({ _id: { $in: bids } }).toArray(function(err, result){
            if (err) throw err;
            console.log("====Got User Bids Info====")
            callback(result)
        });
    });
};



//Connect to mLab
mongodb.MongoClient.connect(uri, function(err, dbRef) {
    if(err) throw err;
    db = dbRef;
    setupCollections();

    //createNewUser("googleUNIQUETHINGFROMOAUTH", "isaacsiegel", function(){});

    //createNewAuction("googleUNIQUETHINGFROMOAUTH", "Mow My Lawn",
    //    "I would like someone to mow my lawn once a week. I have a lawnmower.", 20, function(){});
    //
    //createNewBid("googleUNIQUETHINGFROMOAUTH", 20, function(){});



    //getUserInfo("googleUNIQUETHINGFROMOAUTH",function(){});

    //var thing = cursor.toArray(function(err,result){
    //    console.log(result)
    //
    //});
    //cursor.each(function(err,doc){
    //    console.log(doc)
    //
    //})
});


function setupCollections(){
    users_collection = db.collection('users');
    bids_collection = db.collection('bids');
    auctions_collection = db.collection('requests');
}
