function keyPressed() {
  socket.emit('keypress', keyCode);
  console.log("Client sent keypress: " + keyCode);
}
