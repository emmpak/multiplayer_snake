var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('public'));


var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  socket.on('connection name', function(user){
    io.emit('new user', user.name + " has joined.");
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('move', function(position){
    io.emit('move', position);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
