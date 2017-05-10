var socket = io();
var square;

function setup() {
  createCanvas(1000, 1000);
  square = new Square();
}

function draw() {
  background(0, 0, 255);
  square.show();
}

function updatePosition(x, y) {
  square.update(x, y);
}


function Square() {
  // this.x = 490;
  // this.y = 490;

  this.update = function(x, y) {
    this.x = x;
    this.y = y;
  };

  this.show = function() {
    fill(255);
    rect(this.x,this.y,20,20);
  };

}

socket.on('update position', function(coordinates){
  updatePosition(coordinates.x, coordinates.y);
});
