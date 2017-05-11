var socket = io();
var squares = [];
var colours = ['white', 'red', 'green', 'pink'];

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background('#34495e');
  for(var i=0; i<squares.length; i++){
    squares[i].show(i);
  }
}

function updatePosition(i, x, y) {
  squares[i].update(x,y);
}

function Square() {

  this.update = function(x, y) {
    this.x = x;
    this.y = y;
  };

  this.show = function(id) {
    fill(colours[id]);
    rect(this.x,this.y,20,20);
  };
}

socket.on('update position', function(coordinates){
  while(coordinates.length > squares.length) {
    squares.push(new Square());
  }
  for(var i=0; i<coordinates.length; i++){
    updatePosition(coordinates.id, coordinates.position.x, coordinates.position.y);
  }
});

// function testingSocketNewSquare() {
//   squares.push(new Square());
//   console.log(squares);
// }
//
// function testingSocketUpdatePosition(coordinates) {
//   for(var i=0; i<coordinates.length; i++){
//     updatePosition(coordinates[i].id, coordinates[i].position.x, coordinates[i].position.y);
//   }
// }
