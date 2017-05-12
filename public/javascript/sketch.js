var socket = io();

var squares = [];
var colours = ['white', 'yellow', 'chocolate', 'crimson', 'red', 'green', 'blueViolet', 'bisque', 'darkGoldenRod', 'gray', 'orange', 'deepPink', 'lawnGreen'];
var winningMessage = "";

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background('#34495e');
  for(var i=0; i<squares.length; i++){
    squares[i].show(i);
  }
  fill(255);
  textSize(50);
  text(winningMessage, 275, 500);
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

socket.on('winner', function(message){
  winningMessage = message;
});

socket.on('disconnect', function(id){
  console.log(squares);
  squares = squares.filter(function(square) {square.id !== id});
  console.log(squares);
});
