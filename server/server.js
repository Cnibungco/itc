var app = require("express")(),
	path = require("path"),
	http = require('http').Server(app),
	io = require("socket.io")(http);


app.get('/', function(req, res){
  res.sendFile(path.resolve( __dirname + '/../public_html/index.html'));
});

app.get(/^(.+)$/, function(req, res){
	console.log('static file request : ' + req.params[0]);
	res.sendFile(path.resolve(__dirname + "/../public_html/" + req.params[0]));
});

io.on('connection', function(socket){
  console.log('a user connected');

	socket.emit("hello",{
  	hello: "hi",
  	goodbye: 124
  })
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
