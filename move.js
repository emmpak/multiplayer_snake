$(function () {
  $(document).on('keydown', function(key){
      move(key.which);
    });

  function move(key) {
    switch(key) {
    case 40:
      $("#move").animate({top: "+=5"}, "fast");
      break;
    case 37:
      $("#move").animate({left: "-=5"}, "fast");
      break;
    case 39:
      $("#move").animate({left: "+=5"}, "fast");
      break;
    case 38:
      $("#move").animate({top: "-=5"}, "fast");
      break;
    }
  }
});
