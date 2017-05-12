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

socket.on('update positions', function(players){
  while(players.length >= squares.length) {
    squares.push(new Square());
  }
  for(var i=0; i<players.length; i++){
    for(var j=0; j<players[i].positions; j++){
      updatePosition(players[j].id, players[j].positions[0], players[j].positions[1]);
    }
  }
});

socket.on('update single position', function(player){
    if(squares.length === 0) {
      squares.push(new Square());
    }
    console.log(squares);
    console.log(player.id);
    updatePosition(player.id, player.positions.slice(-1)[0][0], player.positions.slice(-1)[0][1]);
});

socket.on('disconnect', function(id){
  console.log(squares);
  squares = squares.filter(function(square) {square.id !== id;});
  console.log(squares);
});
