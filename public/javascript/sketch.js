var squares = [];

function setup() {
  createCanvas(1000, 1000);
  background(0, 0, 255);
  squares[0] = new Square();
}

function updateSquare(x, y) {
  draw(x, y);
}
function removeSquare(){
  squares.splice(0, 1);
}

function draw(x=20, y=20) {
  for (var i = 0; i < squares.length; i++ ){
    squares[i].move(x, y);
    squares[i].display();
  }
}

function Square() {
  this.x = 490;
  this.y = 490;
  this.height = 20;
  this.width = 20;

  this.move = function(x, y) {
    this.x = x;
    this.y = y;
  };
  this.display = function() {
    rect(this.x, this.y, this.width, this.height);
  };
}

// socket.on('update position', function(coordinates){
// updateSquare(50, -20)
// });
