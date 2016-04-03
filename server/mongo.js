var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var uri = 'mongodb://nodeserver:wewillwin@ds011860.mlab.com:11860/itcsoftcomlab';
var db;
var users_collection;
var bids_collection;
var auctions_collection;
var bid_history__collection;

var exports = module.exports = {}

exports.foo = function(){
  console.log("MONGO FOO");
}

//Creators
exports.createNewUser = function(userID, username, callback){
    console.log("MONGO: createNewUser");

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
        var userDocument = result.ops[0];
        callback(userDocument);
    });

    var emptyBidHistory = {
        _id: userID,
        history: []
    };
    bid_history__collection.insert(emptyBidHistory, function(err, result){
        //console.log("+++Initialized New User's Bid History in bid_history_collection");
    })
};

exports.createNewAuction = function(userID, title, description, startingAmount, callback){
    console.log("MONGO: createNewAuction");

    var auction = {
        title: title,
        description: description,
        userID: userID,
        startingAmount : startingAmount,
        bids: [],
        isOpen: true,
        currentLowestPrice: "-"
    };

    auctions_collection.insert(auction, function(err, result){
        if(err) throw err;
        var auctionDocument = result.ops[0];
        callback(auctionDocument);

        //Update user.auctions[] with users new auction
        users_collection.update({_id: userID},{$push: {auctions: auctionDocument._id}}, function(err, added){
            if(err) throw err;
        });
    })
};

exports.createNewBid = function(userID, bidAmount, auctionID, callback){
    console.log("MONGO: createNewBid");
    var bid = {
        userID: userID,
        amount : bidAmount,
        auctionID: auctionID
    };

    bids_collection.insert(bid, function(err, result){
        if(err) throw err;
        //console.log("+++BID CREATED+++");

        var bidDocument = result.ops[0];
        callback(bidDocument);
        updateAuctionLowestPrice(auctionID, bidAmount);

        //Update users_collections.bids[] and auction.bidHistory[]
        users_collection.update({_id: userID},{$push: {bids: bidDocument._id}}, function(err, added){
            if(err) throw err;
            //console.log("Updated user.bids[] with users new bid.");
        });

        //Update auctions_collections.bids[]
        auctions_collection.update({_id: auctionID},{$push: {bids: bidDocument._id}}, function(err, added){
            if(err) throw err;
            //console.log("Updated auction.bids[] with users new bid.");
        });

        //update user's bid_history_collection.history[]
        auctions_collection.findOne({_id: auctionID},function(err, result){
            var newBidHistoryBid = {
                bid: bidDocument,
                auction: result
            };
            bid_history__collection.update({_id: userID},{$push: {history: newBidHistoryBid}}, function(err, added){
                if(err) throw err;
                //console.log("Updated bid_history_collection.history[] with users new bid.");
            });
        });
    })
};

//Getters
exports.login = function(userID, username, callback){
    console.log("MONGO: login");
    //users_collection.findOne({ _id: new ObjectId(userID)},
    users_collection.findOne({ _id: userID},
        function(err,result){
            if (err) throw err;
            if (!result){
                //first time user, create account
                console.log("===NEW USER===")
                exports.createNewUser(userID, username, function(result){
                    callback(result);
                });
            }
            else{
                console.log("===RETURNING USER===")
                callback(result);
            }
        }
    );
};

exports.getUserInfo = function(userID, callback){
    console.log("MONGO: getUserInfo");
    users_collection.findOne({ _id: userID},
        function(err,result){
            if (err) throw err;
            console.log("getUserIngo",result)
            callback(result);
        }
    );
};

exports.getBidHistory = function(userID, callback){
    console.log("MONGO: getBidHistory");
    var user = {_id: userID};
    bid_history__collection.find(user,{history: true}).toArray( function(err, result){
        //console.log("====Got Bid History for user: "+userID +"====");
        callback(result);
    });
};

exports.getAuctionDetails = function(auctionID, callback){
    console.log("MONGO: getAuctionDetails");

    auctions_collection.findOne({ _id: new ObjectId(auctionID)}, function(err, result){
        if (err) throw err;
        var auctionDocument = result;
        console.log("DOC",auctionDocument)
        bids_collection.find({_id: { $in: auctionDocument.bids }})
            .toArray(
                function(err, result){
                    var auctionBids = result;
                    var remainingQueries = auctionBids.length;

                    for (var i = 0; i < auctionBids.length; i++) {
                        var bid = auctionBids[i];
                        (function (bid){
                            users_collection.findOne(
                                {
                                    _id: bid.userID
                                },
                                {
                                    _id: true,
                                    username: true,
                                    comments: true
                                },
                                function(err, result){
                                    if (err) throw err;
                                    bid.user = result;
                                    remainingQueries--;
                                    if (remainingQueries == 0){
                                        auctionDocument.bidHistory = auctionBids;
                                        callback(auctionDocument);
                                    }
                                }
                            )
                        }(bid))
                    }
                }
            );
    });
};

exports.getUserOpenAuctions = function(userID, callback){
    users_collection.findOne({_id: userID},{auctions: true}, function(err, result){
        callback(result);
    })
};

exports.searchAuctions = function(searchText, callback){
    auctions_collection.find({ $text: { $search: searchText}}).toArray(function(err, result){
        var auctionDocuments = result;
        var remainingQueryCount = auctionDocuments.length;
        if (auctionDocuments.length == 0){
            callback([]);
            return;
        }
        auctionDocuments.forEach(function(auction){
            (function(auction){
                users_collection.findOne({_id: auction.userID},function(err, result){
                    auction.user = result;
                    remainingQueryCount--;
                    if (remainingQueryCount == 0){
                        callback(auctionDocuments)
                    }
                });
            }(auction))
        })
    })
};

//PRIVATE FUNCTIONS
function updateAuctionLowestPrice(auctionID, bidAmount){
    auctions_collection.findOne({_id: auctionID},{currentLowestPrice: true}, function(err, result){
        var currentPrice = result.currentLowestPrice;
        if (currentPrice == "-" || currentPrice > bidAmount){
            auctions_collection.update({_id: auctionID}, {$set: {currentLowestPrice: bidAmount}});
        }
    })
}

//Mongo Setup
mongodb.MongoClient.connect(uri, function(err, dbRef) {
    if(err) throw err;
    db = dbRef;
    setupCollections();
});

function setupCollections(){
    users_collection = db.collection('users');
    bids_collection = db.collection('bids');
    auctions_collection = db.collection('auctions');
    bid_history__collection = db.collection("bid_history");
}
