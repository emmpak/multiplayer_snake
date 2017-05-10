var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var square = require('./calculatePosition')
var position = {x:490, y:490};
var globalKey = 1;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  setInterval(function(){
    console.log("globalKey: " + globalKey);
    io.emit('update position', square.calculatePosition(position,globalKey));
  }, 500);

  console.log('new connection ' + socket.id)

  socket.on('keypress', function(key){
    console.log("Server received keypress: " + key);
    globalKey = key;
    io.emit('update position', square.calculatePosition(position,key));
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
