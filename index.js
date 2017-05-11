var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var square = require('./calculatePosition');
http.lastPlayerID = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  console.log('new connection ' + socket.id);
  socket.player = {
    id: http.lastPlayerID++,
    position: {
      x: randomInt(100,400),
      y: randomInt(100,400)
    },
    key: 0,
    positions: []
  };

  if(getAllPlayers().length === 1){
    setInterval(function(){
      io.emit('update position', updatePositions());
      console.log(getAllPlayers());
    }, 700);
  }

  function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
      var player = io.sockets.connected[socketID].player;
      if(player) players.push(player);
    });
    return players;
  }

  function updatePositions() {
    getAllPlayers().forEach(function(player){
      square.calculatePosition(socket.player);
      console.log(player.positions);
    });
    return getAllPlayers();
  }

  function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}



  socket.on('keypress', function(key){
    console.log("Server received keypress: " + key);
    socket.player.key = key;
    io.emit('update position', square.calculatePosition(socket.player));
  });

  socket.on('disconnect', function() {
    console.log(socket.player.id);
    io.emit('disconnect',socket.player.id);
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
