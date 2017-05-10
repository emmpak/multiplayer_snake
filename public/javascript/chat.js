$('form').submit(function(){
  socket.emit('message', $('#m').val());
  $('#m').val('');
  return false;
});


  socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
