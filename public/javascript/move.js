$(function () {
  $(document).on('keydown', function(key){
      var position = move(key.which);
      socket.emit('move', position);
    });

  function move(key) {
    switch(key) {
    case 40:
      $("#move").animate({top: "+=5"}, "fast");
      $("#move").position();
      break;
    case 37:
      $("#move").animate({left: "-=5"}, "fast");
      $("#move").position();
      break;
    case 39:
      $("#move").animate({left: "+=5"}, "fast");
      $("#move").position();
      break;
    case 38:
      $("#move").animate({top: "-=5"}, "fast");
      $("#move").position();
      break;
    }
  }
});
