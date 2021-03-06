var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var io = require('socket.io')(server);

//app.use(express.static(__dirname + '/client.html'));

server.listen(PORT, function() {
  console.log('Chat server running');
});

app.get('/',function(req, res){  //2
  res.sendFile(__dirname + '/client/client.html');
});

app.use('/client', express.static('main.js'));
app.use('/client', express.static('ios.css'));

io.on('connection', function(socket) {
  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});
