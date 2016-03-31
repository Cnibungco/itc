var express = require("express"),
	path = require("path");
var app = express();

/* serves main page */
app.get("/", function(req, res) {
	res.sendFile(path.resolve( __dirname + '/../public_html/index.html'));
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
	console.log('static file request : ' + req.params[0]);
	res.sendFile(path.resolve(__dirname + "/../public_html/" + req.params[0])); 
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on " + port);
});