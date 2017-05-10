$(function () {
  $(document).on('keydown', function(key){
      // var position = move(key.which);
      socket.emit('move', key.which);
    });

  function move(key) {
    switch(key) {
    case 40:
      $("#move").animate({top: "+=5"}, "fast");
    case 37:
      $("#move").animate({left: "-=5"}, "fast");
    case 39:
      $("#move").animate({left: "+=5"}, "fast");
    case 38:
      $("#move").animate({top: "-=5"}, "fast");
    default:
      return $("#move").position();
    }
  }
});
