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
  console.log(socket.id);
  socket.player = {
    id: http.lastPlayerID++,
    position: {
      x: randomInt(100,400),
      y: randomInt(100,400)
    },
    key: 0
  };
  // setInterval(function(){
  //   io.emit('all players', getAllPlayers());
  // },500);
  setInterval(function(){
    // console.log("globalKey: " + globalKey);
    io.emit('update position', square.calculatePosition(socket.player.position,socket.player.key));
  }, 5000);

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


  console.log('new connection ' + socket.id)

  socket.on('keypress', function(key){
    console.log("Server received keypress: " + key);
    socket.player.key = key;
    console.log(socket.player);
    io.emit('update position', square.calculatePosition(socket.player.position, key));
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
