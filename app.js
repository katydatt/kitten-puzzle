$(document).ready(function()

{

  var zi = 1;
  var EmptySquare = 16;

  $.fn.extend({
    puzzle:
    function(square_size)
     {
      var targElem = "#" + $(this).attr("id");
      var boardSize = (square_size * 4) + "px";

      $(targElem).html("<div id = 'board'></div>");

      $("#board").css({ position: 'absolute', width: boardSize, height: boardSize, border: '1px solid #D9853B'});

      for (var i = 0; i < 16; i++)
      {
        $("#board").append("<div style = 'position: absolute; left: " + ((i % 4) * square_size) + "px; top: " + Math.floor(i / 4) * square_size + "px; width: " + square_size + "px; height: " + square_size + "px; text-align: center; line-height: 128px; border: 1px solid #D9853B; background: #ECECEA url(kitten.jpg) " + (-(i % 4) * square_size) + "px " + -Math.floor(i / 4) * square_size + "px no-repeat !important'></div> ");
      }

      $("#board").children("div:nth-child(" + EmptySquare + ")").css({backgroundImage: " ", background: "#ECECEA"});

      $("#board").children("div").click(function()
      {
        Move(this, square_size);
      });
    }
  });

  function Move(clicked_square, square_size)

  {

    var movable = false;
    var oldX = $("#board").children("div:nth-child(" + EmptySquare + ")").css("left");
    var oldY = $("#board").children("div:nth-child(" + EmptySquare + ")").css("top");

    var newX = $(clicked_square).css("left");
    var newY = $(clicked_square).css("top");

    if (oldX == newX && newY == (parseInt(oldY) - square_size) + "px")
      movable = true;

    if (oldX == newX && newY == (parseInt(oldY) + square_size) + "px")
      movable = true;

    if ((parseInt(oldX) - square_size) + "px" == newX && newY == oldY)
      movable = true;


    if ((parseInt(oldX) + square_size) + "px" == newX && newY == oldY)
      movable = true;

    if (movable)
     {
      $(clicked_square).css("z-index", zi++);
      $(clicked_square).animate({ left: oldX, top: oldY }, 200, function()
      {
        $("#board").children("div:nth-child(" + EmptySquare + ")").css("left", newX);
        $("#board").children("div:nth-child(" + EmptySquare + ")").css("top", newY);
      });
    }

  }

  $("#game-board").puzzle(100);

});
