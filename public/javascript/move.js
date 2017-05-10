function keyPressed() {
  socket.emit('keypress', keyCode);
  console.log(keyCode);
}
