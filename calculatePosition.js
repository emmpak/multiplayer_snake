module.exports = {
  calculatePosition: function(player) {
    player.positions.push(JSON.parse(JSON.stringify(player.position)));
    switch(player.key) {
    case 40:
      player.position.y += 20;
      return player.position;
    case 37:
      player.position.x -= 20;
      return player.position;
    case 39:
      player.position.x += 20;
      return player.position;
    case 38:
      player.position.y -= 20;
      return player.position;
    default:
    return player.position;
    }
  }
}
