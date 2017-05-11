var socket = io();
var squares = [];

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(0, 0, 255);
  for(var i=0; i<squares.length; i++){
    squares[i].show();
  }
}

function updatePosition(i, x, y) {
  squares[i].update(x,y)
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

// socket.on('update position', function(coordinates){
//   for(var i=0; i<coordinates.length; i++){
//     updatePosition(coordinates.id, coordinates.position.x, coordinates.position.y);
//   }
// });
//
// socket.on('new player', function() {
//   squares << new Square();
// });

function testingSocketNewSquare() {
  squares.push(new Square());
  console.log(squares);
}

function testingSocketUpdatePosition(coordinates) {
  for(var i=0; i<coordinates.length; i++){
    updatePosition(coordinates[i].id, coordinates[i].position.x, coordinates[i].position.y);
  }
}
