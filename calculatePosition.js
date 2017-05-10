module.exports = {
  calculatePosition: function(position, key) {
    switch(key) {
    case 40:
      position.y += 5;
      return position;
    case 37:
      position["x"] -= 5;
      return position;
    case 39:
      position["x"] += 5;
      return position;
    case 38:
      position["y"] -= 5;
      return position;
    }
  }
}
