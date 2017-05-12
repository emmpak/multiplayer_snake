var socket = io();

var squares = [];
var colours = ['white', 'red', 'green', 'yellow', 'blueViolet', 'bisque', 'chocolate', 'darkGoldenRod', 'crimson', 'gray', 'orange', 'deepPink', 'lawnGreen'];

function setup() {
  createCanvas(1000, 1000);
  background('#34495e');
}

function draw() {
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
  while(coordinates.length >= squares.length) {
    squares.push(new Square());
  }
  for(var i=0; i<coordinates.length; i++){
    updatePosition(coordinates[i].id, coordinates[i].position.x, coordinates[i].position.y);
  }
});

socket.on('disconnect', function(id){
  console.log(squares);
  squares = squares.filter(function(square) {square.id !== id});
  console.log(squares);
});
