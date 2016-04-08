# JobWellDone.io
### Introduction
JobsWellDone.io is a web service that connects clients with service providers.
By providing an intuitive, real time bidding service, service providers are able
to bid on Service Auctions so that clients can get the best value.


### Application States
#### Search
The search feature allows a user to search for Service Auctions.
The search will match words found in the Auction Title, or Description.
Clicking on one of these auctions will bring you to the Auction Details.
The auctions are displayed with cards that provide easy access to relevant data,
 such as the client's rating. We all want to get paid!

#### Auction Details (In Context of an Auction)
Here a user can view all information related to an Auction. Service Providers can bid in real time, and Clients can choose a winning bid, closing the auction.
At this point, the Client's email is revealed to the Provider, and email communication can begin.
When the Service has been completed, both parties can rate and comment on each other in Auction Details.

#### User Profile (In Context of an User)
Clicking a user's name in any part of the application will bring you to the User Profile screen. Here you can view all past comments, as well as their calculated ratings.

#### My Open Auctions
Here users can view the Auctions which they created. These auctions are still
open for bidding. Clicking on one of these auctions will bring you to the
Auction Details.

#### My Closed Auctions
Here users can view the closed Auctions which they created. Clicking on one of these auctions will bring you to the
Auction Details.

#### Active Bids
Here a user can check up on any Auctions that they have been bidding on.
These auctions are filtered so that only the open auctions are visible.
Clicking on one of these auctions will bring you to the
Auction Details.

#### Auctions Won
Here users can review Auctions that they have won. A user wins an auction
when the client chooses their bid as the winning bid.
Clicking on one of these auctions will bring you to the
Auction Details.

#### Bid History
Here users can view all their past bids.

### Rating System
All ratings and comments on a User are publicly available for viewing on their user profile page. Each user has an average rating overall, as a Client, and as a Provider.

## The Technology Stack

### Database: MongoDB
See Below

### BackEnd: Node.JS
We utilized Node.JS for our backend to achieve fast, asynchronous interactions from our web sockets and database.
### FrontEnd: Angular.JS
We used AngularJS to provide a full, single page application experience to our users. This achieves a near native experience in the comfort of a web browser.

### Websockets: Socket.io
We used Socket.io to connect our Angular FrontEnd with our Node Backend. This allows us to achieve real time updates between users.

### Google OAuth: Firebase/AngularFire
We used Firebase to achieve Google OAuth. This allows us to have Google grade user security, and a much faster user sign up process.

### Database Design
##### Why MongoDB?
MongoDB is the leading NoSQL database solution that aims to solve the
inefficiencies of traditional relational databases. We chose MongoDB for its
lightning fast atomic operations and horizontal scalability.

This particular application has a large variety of data access patterns.
MongoDB serves our needs because it allows us to avoid a database design that is
data access pattern agnostic. We can very efficiently serve requested data to
users by preparing data before it is queried, avoiding typical inefficient
relational  joins.

##### Schema
MongoDB uses a document based approach to storing data.
We used several collections to store our data,
for example collections for users, bids, auctions.

```
user:
      {
        username: "Isaac Siegel",
        profilePictureURL : "https://lh4.googleusercontent.../photo.jpg"
        ratings:
                {
                  overallRating: 3,
                  clientRating: 5,
                  providerRating: 2,
                }
        ...
      }
```

The real magic comes into play with our bid_history collection. This collection
would typically require a join across multiple bids at request time, but instead
we precompile the data every time a user makes a bid. The important part is that
this processing is done 'off the clock', after we send the user on their way
with their necessary data.
