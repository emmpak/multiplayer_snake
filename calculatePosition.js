module.exports = {
  calculatePosition: function(player) {
    // player.positions.push(JSON.parse(JSON.stringify(player.position)));
    var lastElement = player.positions.slice(-1)[0];
    switch(player.key) {
    case 40:
      lastElement[1] += 20;
      player.positions.push(lastElement);
      return player.positions;
    case 37:
      lastElement[0] -= 20
      player.positions.push(lastElement);
      return player.positions;
    case 39:
      lastElement[0] += 20
      player.positions.push(lastElement);
      return player.positions;
    case 38:
      lastElement[1] -= 20
      player.positions.push(lastElement);
      return player.positions;
    default:
      return player.positions;
    }
  }
}
