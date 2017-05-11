var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var square = require('./calculatePosition')
http.lastPlayerID = 0;
// var position = {x:490, y:490};
// var globalKey = 1;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  socket.on('new player', function() {
    socket.player = {
      id: http.lastPlayerID++,
      x: randomInt(100,400),
      y: randomInt(100,400)
    };
    socket.emit('all players', getAllPlayers());
    socket.broadcast.emit('new player', socket.player);
  });

  function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
      var player = io.sockets.connected[socketID].player;
      if(player) players.push(player);
    });
    return players;
  }

  function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
  //
  // setInterval(function(){
  //   console.log("globalKey: " + globalKey);
  //   io.emit('update position', square.calculatePosition(position,globalKey));
  // }, 500);

  console.log('new connection ' + socket.id)

  socket.on('keypress', function(key){
    console.log("Server received keypress: " + key);
    // globalKey = key;
    console.log(socket.player);
    io.emit('update position', square.calculatePosition(socket.player, key));
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
