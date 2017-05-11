var socket = io();
var squares =[];

function setup() {
  createCanvas(1000, 1000);
  socket.emit('new player');
}

function draw() {
  background(0, 0, 255);
  for(var i=0; i<squares.length; i++){
    squares[i].show();
  }
}

function updatePosition(x, y) {
  square.update(x, y);
}

function Square() {
  this.update = function(x, y) {
    this.x = x;
    this.y = y;
  };

  this.show = function() {
    fill(255);
    rect(this.x,this.y,20,20);
  };
}

socket.on('new player', function(player){
  squares.push(player);
})

socket.on('all players', function(players){
  for(var i=0; i< players.length; i++) {
    squares.push(players[i]);
  }
});

socket.on('update position', function(coordinates){
  updatePosition(coordinates.x, coordinates.y);
});
