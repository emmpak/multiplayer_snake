var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));


var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var position = {x: 300, y:300};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  console.log('new connection ' + socket.id)
  socket.on('move', function(key){
    io.emit('move', calculatePosition(key));
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});



function calculatePosition(key) {
  switch(key) {
  case 40:
    position[y] -= 5;
  case 37:
    position[x] += 5;
  case 39:
    position[x] -= 5;
  case 38:
    position[y] += 5;
  default:
    position;
  }
}
