function keyPressed() {
  socket.emit('move', keyCode);
  console.log(keyCode);
}
