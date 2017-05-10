var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));


var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var square = require('./calculatePosition')


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  var position = {x: 490, y:490};
  var globalKey = 1;
  setInterval(function(){
    console.log(globalKey);
    io.emit('update position', square.calculatePosition(position,globalKey));
  }, 500);


  console.log('new connection ' + socket.id)

  socket.on('keypress', function(key){
    console.log("this one" + key);
    globalKey = key;
    io.emit('update position', square.calculatePosition(position,key));
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
