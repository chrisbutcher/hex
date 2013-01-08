(function(){
    var canvas = document.getElementById('hexmap');

    var radius = 24,
        width = radius * Math.sqrt(3) / 2,
        boardWidth = 10,
        boardHeight = 11;

    var hexX, hexY;
    var screenX, screenY;

    var bluePlayerTurn = true;

    var blueFillStyle = '#0000ff';
    var redFillStyle = '#ff0000';

    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 1;

        redraw();

         $("#hexmap").click(function(e){
            bluePlayerTurn = !bluePlayerTurn;
            redraw();
         });

        canvas.addEventListener("mousemove", function(eventInfo) {
            var x,
                y,


            x = eventInfo.offsetX || eventInfo.layerX;
            y = eventInfo.offsetY || eventInfo.layerY;

            hexY = Math.floor(y / (radius / 2 + radius));
            hexX = Math.floor((x - hexY * width) / (2 * width));

            screenX = hexX * 2 * width + (hexY  * width);
            screenY = hexY * (radius / 2 + radius);

            redraw();

        });
    }

    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBoard(ctx, boardWidth, boardHeight);
      //
      // Check if the mouse's coords are on the board
      if(hexX >= 0 && hexX < boardWidth) {
          if(hexY >= 0 && hexY < boardHeight) {
              if (bluePlayerTurn === true)
                  ctx.fillStyle = blueFillStyle;
              else
                  ctx.fillStyle = redFillStyle;

              drawHexagon(ctx, screenX, screenY, true);
          }
      }
    }

    function drawBoard(canvasContext, w, h) {
        var i,
            j;

        for(i = 0; i < w; ++i) {
            for(j = 0; j < h; ++j) {
                drawHexagon(
                    ctx,
                    i * 2 * width + (j * width),
                    j * (radius + radius / 2),
                    false
                );
            }
        }
    }

    function drawHexagon(canvasContext, x, y, fill) {
        canvasContext.beginPath();
        canvasContext.moveTo(x + width, y);
        canvasContext.lineTo(x + 2 * width, y + radius / 2);
        canvasContext.lineTo(x + 2 * width, y + 3 * radius / 2);
        canvasContext.lineTo(x + width, y + 2 * radius);
        canvasContext.lineTo(x, y + 3 * radius / 2);
        canvasContext.lineTo(x, y + radius / 2);
        canvasContext.closePath();

        if(fill) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }

})();
