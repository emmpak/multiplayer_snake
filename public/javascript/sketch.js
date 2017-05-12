var socket = io();

var snakes = [];
var colours = ['white', 'red', 'green', 'yellow', 'blueViolet', 'bisque', 'chocolate', 'darkGoldenRod', 'crimson', 'gray', 'orange', 'deepPink', 'lawnGreen'];

function setup() {
  createCanvas(1000, 1000);
  background('#34495e');
}

function draw() {
  for(var i=0; i<snakes.length; i++){
    snakes[i].show(i);

    // for(var j=0; j<snakes[i].positions; j++) {
    //   snakes[i].show(i, j);
    // }
  }
}

function updatePosition(i, positions) {
  snakes[i].update(positions);
}

function Snake() {
  this.positions = []

  this.update = function(positions) {
    this.positions = positions;
  };

  this.show = function(i) {
    fill(colours[i]);
    this.positions.forEach(function(position) {rect(position[0],position[1],20,20);})
    // rect(this.positions[j][0],this.positions[j][1],20,20);
  };
}

socket.on('new player', function(number) {
  for(var i = 0; i < number; i++){
    snakes.push(new Snake());
  }
})

socket.on('update position', function(players){
  while(players.length > snakes.length) {
    snakes.push(new Snake());
  }
  for(var i=0; i<players.length; i++){
    updatePosition(players[i].id, players[i].positions);
  }
});

socket.on('update single position', function(player){
    updatePosition(player.id, player.positions);
});

socket.on('disconnect', function(id){
  snakes = snakes.filter(function(square) {square.id !== id;});
});
