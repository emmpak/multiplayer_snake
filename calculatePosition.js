module.exports = {
  calculatePosition: function(player) {
    var lastElement = JSON.parse(JSON.stringify(player.positions.slice(-1)[0]));
    switch(player.key) {
    case 40:
      lastElement[1] += 20;
      player.positions.push(lastElement);
      return player;
    case 37:
      lastElement[0] -= 20;
      player.positions.push(lastElement);
      return player;
    case 39:
      lastElement[0] += 20;
      player.positions.push(lastElement);
      return player;
    case 38:
      lastElement[1] -= 20;
      player.positions.push(lastElement);
      return player;
    default:
      return player;
    }
  }
};
