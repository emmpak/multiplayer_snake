var socket = io();

var squares = new Square();
var colours = ['white', 'red', 'green', 'pink'];

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background('#34495e');
  for(var i=0; i<squares.players.length; i++){
    squares.players[i].show(i);
  }
}

// function updatePosition(i, x, y) {
//   squares[i].update(x,y);
// }

function Square() {

  this.players = players;

  this.update = function(players) {
    this.players = players;
  }

  this.show = function(id) {
    fill(colours[id]);
    console.log(this.positions);
    var square = squares.find(function(square) { return square.id === id });
    console.log(square);
    for(var i=0; i<this.positions.length; i++) {
      rect(square.x, square.y, 20,20);
    }
    // rect(this.x,this.y,20,20);
  };
}

socket.on('connect', function(players){
  squares.update(players);
  console.log(square.players);
});

socket.on('update position', function(players) {
  // var i = squares.map(function(square) { return square.id }).indexOf(player.id);
  squares.update(players);
  console.log(squares)
  // for(var i=0; i<square.positions.length; i++) {
  //   rect(square.x, square.y, 20,20);
  // }
});

socket.on('disconnect', function(id){
  squares = squares.filter(function(square) {square.id !== id});
});
