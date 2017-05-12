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

  var originalPosition = startPoint();
  socket.player = {
    id: http.lastPlayerID++,
    key: 0,
    positions: [originalPosition]
  };

  io.emit('new player', http.lastPlayerID + 1);

  if(getAllPlayers().length === 1){
    setInterval(function(){
      io.emit('update position', updatePositions());
    }, 100);
  }

  socket.on('keypress', function(key){
    console.log("Server received keypress: " + key);
    socket.player.key = key;
    if(socket.player.dead !== true) {
      io.emit('update single position', square.calculatePosition(socket.player));
    } else {
      console.log(socket.player.id + " is dead!");
    }
  });

  socket.on('disconnect', function() {
    console.log(socket.player.id);
    io.emit('disconnect',socket.player.id);
  });

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
      console.log(player.positions);

      if(player.dead) {
        console.log(player.id + " is dead!")
      }
      else if(checkBoundary(player.positions.slice(-1)[0]) != true) {
        square.calculatePosition(player);
      } else {
        player.dead = true;
        playersDead += 1;
        if(playersDead+1 >= getAllPlayers().length) {
          io.emit('winner', 'We have a WINNER!');
          setTimeout(function() {
            io.emit('winner', 'New game starts in: 3');
            setTimeout(function() {
              io.emit('winner', 'New game starts in: 2');
              setTimeout(function() {
                io.emit('winner', 'New game starts in: 1');
                setTimeout(function() {
                  resetAllPlayers();
                }, 1000);
              }, 1000);
            }, 1000);
          }, 3000);
        } else {
        }
      }
    });
    return getAllPlayers();
  }


  function resetAllPlayers() {
    getAllPlayers().forEach(function(player){
      player.dead = false;
      var originalPosition = startPoint();
      player.positions = [originalPosition];
      player.key = 0;
      playersDead = 0;
      io.emit('winner', "");
    })
  }

  function checkBoundary(pos) {
    if(pos[0] < 0 || pos[1] < 0 || pos[0] > 980 || pos[1] > 980) {
      return true;
    }
  }

  function randomInt (low, high, multiple) {
    return Math.floor(Math.random() * (high - low) + low) * multiple;
  }

  function startPoint() {
    var x = randomInt(5,45,20);
    var y = randomInt(5,45,20);
    return [x,y];
  }
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
