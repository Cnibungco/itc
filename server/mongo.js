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
        participatingAuctionIDs: [],
        auctionsWon: [],
        feedbackForProvider:{},
        feedbackForClient: {},
        ratings: {
            clientRating: 0,
            providerRating: 0,
            overallRating: 0
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
        currentLowestBid: {
            price: "-",
            userID: ""
        },
        feedbackForClient: {},
        feedbackForProvider: {},
        winner: {}
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
        auctionID: auctionID,
        isWinningBid : false
    };

    bids_collection.insert(bid, function(err, result){
        if(err) throw err;
        //console.log("+++BID CREATED+++");

        var bidDocument = result.ops[0];
        users_collection.findOne({_id: userID},{_id: true, username: true}, function(err, result){
            bidDocument.user = result;
            updateAuctionLowestBid(userID, auctionID, bidAmount, function(){
                callback(bidDocument);
            });
        });



        //Update users_collections.bids[] and auction.bidHistory[]
        users_collection.update({_id: userID},
            {$push: {bids: bidDocument._id}, $addToSet: {participatingAuctionIDs: new ObjectId(auctionID)}},
            function(err, added){
                if(err) throw err;
                //console.log("Updated user.bids[] with users new bid.");
            }
        );

        //Update auctions_collections.bids[]
        auctions_collection.update({_id: new ObjectId(auctionID)},{$push: {bids: bidDocument._id}}, function(err, added){
            if(err) throw err;
            //console.log("Updated auction.bids[] with users new bid.");
        });

        //update user's bid_history_collection.history[]
        auctions_collection.findOne({_id: new ObjectId(auctionID)},function(err, result){
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
    users_collection.findOne({ _id: userID},{_id: true, username: true, comments: true},
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
        console.log("auctionDoc", auctionDocument)
        users_collection.findOne({_id: auctionDocument.userID}, function(err, result){
            auctionDocument.owner = result;
            bids_collection.findOne(
                {_id: new ObjectId(auctionDocument.winningBid)},
                {_id: true, userID: true},
                function(err, result){
                    if (err) throw err;
                    var bidderID = "";

                    if (result != null){
                        bidderID = result.userID;
                    }



                    users_collection.findOne(
                        {_id: bidderID},
                        {_id: true, username: true, rating: true},
                        function(err, result){
                            auctionDocument.winner = result;

                            bids_collection.find({_id: { $in: auctionDocument.bids }})
                                .toArray(
                                    function(err, result){
                                        var auctionBids = result;
                                        var remainingQueries = auctionBids.length;
                                        auctionDocument.bidHistory = [];
                                        if (remainingQueries == 0){
                                            callback(auctionDocument);
                                            return;
                                        }
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
                        }
                    );


                }
            )


        })
    });
};

exports.getUserOpenAuctions = function(userID, callback){
    users_collection.findOne({_id: userID},{auctions: true, _id: false}, function(err, result){
        var auctionIDs = result.auctions;

        if (auctionIDs.length == 0){
            callback([]);
            return;
        }

        auctions_collection.find({_id: {$in: auctionIDs}, isOpen: true}).toArray( function(err, result){
            callback(result);
        });
    })
};

exports.getUserAuctionHistory = function(userID, callback){
    users_collection.findOne({_id: userID},{auctions: true, _id: false}, function(err, result){
        var auctionIDs = result.auctions;

        if (auctionIDs.length == 0){
            callback([]);
            return;
        }

        auctions_collection.find({_id: {$in: auctionIDs}}).toArray( function(err, result){
            callback(result);
        });
    })
};

exports.getUserParticipatingOpenAuctions = function(userID, callback){
    console.log(userID);
    users_collection.findOne({_id: userID},{participatingAuctionIDs: true, _id: false}, function(err, result){
        var participatingAuctionIDs = result.participatingAuctionIDs;

        if (participatingAuctionIDs.length == 0){
            callback([]);
            return;
        }

        auctions_collection.find({_id: {$in: participatingAuctionIDs}, isOpen: true}).toArray( function(err, result){
            callback(result);
        });
    })
};

exports.closeAuction = function(auctionID, callback){
    auctions_collection.update({_id: new ObjectId(auctionID)}, {$set: {isOpen: false}},
        function(err, added){
            if(err) throw err;
            callback({value: "tell isaac if you need anything"});
        }
    );
}

exports.clientChooseBid = function(userID, auctionID, bidID, callback){
    //update auction to be closed
    auctions_collection.update({_id: new ObjectId(auctionID)}, {$set: {isOpen: false, winningBid: bidID}},
        function(err, added){
            if(err) throw err;
        }
    );

    bids_collection.findOne({_id: new ObjectId(bidID)},{userID: true}, function(err, result){
        var bidderID = result.userID;
        console.log("bidderID: ", bidderID)

        //Provider
        //take auction out of particicipatingAuctionIDs, put in auctionsWon
        users_collection.update(
            {_id: bidderID},
            {
                $pull:
                {
                    participatingAuctionIDs: auctionID
                },
                $push:
                {
                    auctionsWon: new ObjectId(auctionID)
                }
            },
            function(err, result){
                if (err) throw err;
                callback({value: "tell isaac if you need anything"});
            }
        );

    });

    //Update bid to winning bid
    bids_collection.update({_id: new ObjectId(bidID)},{$set: {isWinningBid: true}},function(){
    });

    //TODO: notify bidder of winning the auction/service
};

exports.setFeedbackForClient = function(auctionID, comment, rating, callback){
    console.log(auctionID);
    var feedback = {
        comment: comment,
        rating: rating
    };
    auctions_collection.update({_id: new ObjectId(auctionID)}, {$set: {feedbackForClient: feedback}}, function(err, result){
        if (err) throw err;
        callback({value: "tell isaac if you need anything"});
    })

    auctions_collection.findOne({_id: new ObjectId(auctionID)},{userID: true}, function(err, result){
        var clientID = result.userID;
        var key = "feedbackForClient."+auctionID;

        var setObject = {};
        setObject[key] = feedback;

        users_collection.update({_id: clientID },{$set: setObject}, function(err, result){
            if (err) throw err;
            updateUserRatings(clientID);
        })
    })

};

exports.setFeedbackForProvider = function(auctionID, comment, rating, callback){
    var feedback = {
        comment: comment,
        rating: rating
    };
    auctions_collection.update({_id: new ObjectId(auctionID)}, {$set: {feedbackForProvider: feedback}}, function(err, result){
        if (err) throw err
        callback({value: "tell isaac if you need anything"});
    })

    auctions_collection.findOne({_id: new ObjectId(auctionID)},{winningBid: true}, function(err, result){
        var winningBidID = result.winningBid;
        console.log("winningBidID", result)
        bids_collection.findOne({_id: new ObjectId(winningBidID)},{userID: true}, function(err, result){
            var providerID = result.userID;
            console.log("providers id:", providerID);

            var key = "feedbackForProvider."+auctionID;
            var setObject = {};
            setObject[key] = feedback;

            users_collection.update({_id: providerID },{$set: setObject}, function(err, result){
                if (err) throw err;
                updateUserRatings(providerID);
            })
        });
    })
};

exports.getAuctionsWon = function(userID, callback){
    users_collection.findOne({_id: userID},{auctionsWon: true}, function(err,result){
        var auctionsWonIDs = result.auctionsWon;
        auctions_collection.find({_id: {$in: auctionsWonIDs}}).toArray( function(err, result){
            var auctionsWon = result;
            var remainingQueries = auctionsWon.length * 2;

            if (remainingQueries == 0){
                callback([]);
                return;
            }

            for (var i = 0; i < auctionsWon.length; i++) {
                var auction = auctionsWon[i];
                (function (auction){
                    bids_collection.findOne(
                        {
                            _id: new ObjectId(auction.winningBid)
                        },
                        function(err, result){
                            if (err) throw err;
                            auction.winningBid = result;
                            remainingQueries--;
                            if (remainingQueries == 0){
                                callback(auctionsWon);
                            }
                        }
                    )
                }(auction));

                (function (auction){
                    users_collection.findOne(
                        {
                            _id: auction.userID
                        },
                        {
                            _id: true,
                            username: true,
                        },
                        function(err, result){
                            if (err) throw err;
                            auction.owner = result;
                            remainingQueries--;
                            if (remainingQueries == 0){
                                callback(auctionsWon);
                            }
                        }
                    )
                }(auction));
            }

        });

    })
}

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
                    if (auction.currentLowestBid.userID == null){
                        remainingQueryCount--;
                        if (remainingQueryCount == 0){
                            callback(auctionDocuments)
                        }
                    }

                    users_collection.findOne({_id: auction.currentLowestBid.userID},function(err, result){
                        auction.currentLowestBid.user = result;
                        remainingQueryCount--;
                        if (remainingQueryCount == 0){
                            callback(auctionDocuments)
                        }
                    });
                });
            }(auction))
        })
    })
};

//PRIVATE FUNCTIONS
function updateAuctionLowestBid(userID, auctionID, bidAmount, callback){
    auctions_collection.findOne({_id: new ObjectId(auctionID)},{currentLowestBid: true}, function(err, result){
        var currentLowestBidPrice = result.currentLowestBid.price;
        if (currentLowestBidPrice == "-" ||  bidAmount < currentLowestBidPrice){
            auctions_collection.update(
                {_id: new ObjectId(auctionID)},
                {
                    $set:
                    {
                        currentLowestBid: {price: bidAmount, userID: userID}
                    }
                },
                function(err, result){
                    callback();
                }
            );
        }
    })
}

function updateUserRatings(userID){
    users_collection.findOne({_id: userID}, {feedbackForClient: true, feedbackForProvider: true}, function(err, result){
        var feedbackForClient = result.feedbackForClient;
        var feedbackForProvider = result.feedbackForProvider;

        var newRatings = calculateRatings(feedbackForClient, feedbackForProvider);

        users_collection.update({_id: userID}, {$set: {"ratings": newRatings}},
            function(err, result){
                if (err) throw err;
            }
        )
    })
}

function calculateRatings(feedbackForClient, feedbackForProvider){
    var totalClientRating = 0;
    var totalProviderRating = 0;

    var newRatings = {}

    for (var auctionID in feedbackForClient) {
        var rating = feedbackForClient[auctionID].rating;
        totalClientRating += rating;
    }

    var clientFeedbackCount = Object.keys(feedbackForClient).length;
    if (clientFeedbackCount == 0){
        newRatings.clientRating = 0;
    }
    else{
        newRatings.clientRating = totalClientRating / clientFeedbackCount;
    }

    for (var auctionID in feedbackForProvider) {
        var rating = feedbackForProvider[auctionID].rating;
        totalProviderRating += rating;
    }

    var providerFeedbackCount = Object.keys(feedbackForProvider).length;

    if (providerFeedbackCount == 0){
        newRatings.providerRating = 0;
    }
    else{
        newRatings.providerRating = totalProviderRating / providerFeedbackCount;
    }

    var totalRatingsCount = providerFeedbackCount + clientFeedbackCount;

    if (totalRatingsCount == 0){
        newRatings.overallRating = 0;
    }
    else{
        newRatings.overallRating = (totalClientRating + totalProviderRating) / totalRatingsCount;
    }

    return newRatings;
}

//Mongo Setup
function setupCollections(){
    users_collection = db.collection('users');
    bids_collection = db.collection('bids');
    auctions_collection = db.collection('auctions');
    bid_history__collection = db.collection("bid_history");
}

mongodb.MongoClient.connect(uri, function(err, dbRef) {
    if(err) throw err;
    db = dbRef;
    setupCollections();
});


