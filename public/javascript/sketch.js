var square;

function setup() {
  createCanvas(1000, 1000);
  background(0, 0, 255);
  square = new Square();
}

function updateSquare(x, y) {
  draw(x, y);
}

function draw(x = 10, y = 10) {
  square.move(x, y);
  square.display();
}

function Square() {
  this.x = 490;
  this.y = 490;
  this.height = 20;
  this.width = 20;

  this.move = function(x, y) {
    this.x = x;
    this.y = y;
    square.display();
  }
  this.display = function() {
    rect(this.x, this.y, this.height, this.width);
  }
}

// socket.on('update position', function(coordinates){
// updateSquare(50, -20)
// });
