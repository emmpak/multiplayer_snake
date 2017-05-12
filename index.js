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

var playersDead = 0;

io.on('connect', function(socket){
  console.log('new connection ' + socket.id);
  socket.player = {
    id: http.lastPlayerID++,
    position: {
      x: randomInt(5,45)*20,
      y: randomInt(5,45)*20,
    },
    key: 0
  };

  if(getAllPlayers().length === 1){
    setInterval(function(){
      io.emit('update position', updatePositions());
      console.log(getAllPlayers());
    }, 100);
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
      if(player.dead) {
        console.log(player.id + " is dead!")
      }
      else if(checkBoundary(player.position) != true) {
        player.position = square.calculatePosition(player.position,player.key);
      } else {
        player.dead = true;
        playersDead += 1;
        if(playersDead+1 >= getAllPlayers().length) {
          io.emit('winner', 'We have a WINNER!');
        } else {
        }
      }
    });
    return getAllPlayers();
  }

  function checkBoundary(pos) {
    if(pos.x < 0 || pos.y < 0 || pos.x > 980 || pos.y > 980) {
      return true;
    }
  }

  function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  socket.on('keypress', function(key){
    console.log("Server received keypress: " + key);
    socket.player.key = key;
    if(socket.player.dead !== true) {
      io.emit('update position', square.calculatePosition(socket.player.position, key));
    } else {
      console.log(socket.player.id + " is dead!");
    }
  });

  socket.on('disconnect', function() {
    console.log(socket.player.id);
    io.emit('disconnect',socket.player.id);
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
