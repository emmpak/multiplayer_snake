module.exports = {
  calculatePosition: function(position, key) {
    switch(key) {
    case 40:
      position.y += 20;
      return position;
    case 37:
      position["x"] -= 20;
      return position;
    case 39:
      position["x"] += 20;
      return position;
    case 38:
      position["y"] -= 20;
      return position;
    }
  }
}
