$(document).ready(function() {
    var canvas = document.getElementById('hexmap');

    var radius = 24,
        width = (radius * Math.sqrt(3)) - 1,
        boardWidth = 11,
        boardHeight = 11;

    var hexX, hexY;
    var screenX, screenY;

    // Draw a thin outline around the canvas
    var canvasOutline = false;

    // Game starts as blue player's turn, this can be randomized eventually
    var bluePlayerTurn = true;

    // Create a Javascript version of the board, initializing tiles to 0
    // Blank tile = 0, Blue = 1, Red = 2
    var boardState = make2dArray(boardWidth, boardHeight, 0);

    var blueFillStyle = '#0000ff';
    var redFillStyle = '#ff0000';

    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        redraw();

         $("#hexmap").click(function(e){
            // Only allow clicks on unoccupied tiles.
            // If allowed, assign tile to current player, and change players.
            if (boardState[hexX][hexY] === 0){
                if (bluePlayerTurn === true){
                    boardState[hexX][hexY] = 1;
                }
                else {
                    boardState[hexX][hexY] = 2;
                }
                bluePlayerTurn = !bluePlayerTurn;
            }            
            
            redraw();
         });

        canvas.addEventListener("mousemove", function(eventInfo) {
            var x,
                y,

            x = eventInfo.offsetX || eventInfo.layerX;
            y = eventInfo.offsetY || eventInfo.layerY;

            hexY = Math.floor(y / (radius / 2 + radius));
            hexX = Math.floor((x - hexY * width / 2) / width);

            screenX = hexX * width + hexY  * width / 2;
            screenY = hexY * 3 * radius / 2;

            redraw();
        });
    }

    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw an outline around the canvas (off by default)
      if (canvasOutline){
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'red';
          ctx.stroke();
          ctx.closePath();
      }
      
      // Draw game board (including previously placed tiles)
      drawBoard(ctx, boardWidth, boardHeight);

      // And drawing on top of the game board...
      // Check if the mouse's coords are on the board
      if(hexX >= 0 && hexX < boardWidth) {
          if(hexY >= 0 && hexY < boardHeight) {

              // Only draw a colored hexagon representing the current player
              // if the tile below is blank
              if (boardState[hexX][hexY] === 0){
                  if (bluePlayerTurn === true){
                      drawHexagon(ctx, screenX, screenY, 1);
                  }
                  else{
                      drawHexagon(ctx, screenX, screenY, 2);
                  }              
              }
          }
      }

      drawDebugInfo(ctx, canvas.width, canvas.height);
    }

    // Method for displaying debug information below
    function drawDebugInfo(canvasContext, canvasWidth, canvasHeight) {
        canvasContext.fillStyle = '#000';
        canvasContext.font = 'bold 12px sans-serif';
        canvasContext.textBaseline = 'bottom';
        canvasContext.fillText('X: ' + hexX + ', Y: ' + hexY, 0, canvasHeight-200);
        if (bluePlayerTurn)
            canvasContext.fillText("Blue's turn", 0, canvasHeight-185);
        else
            canvasContext.fillText("Red's turn", 0, canvasHeight-185);
    }

    function drawBoard(canvasContext, w, h) {
        canvasContext.fillStyle = "#000000";
        canvasContext.strokeStyle = "#CCCCCC";
        canvasContext.lineWidth = 1;

        var i,
            j;

        for(i = 0; i < w; ++i) {
            for(j = 0; j < h; ++j) {
                drawHexagon(
                    ctx,
                    i * width + j * width / 2,
                    j * 3 * radius / 2,
                    boardState[i][j]
                );
            }
        }
    }

    function drawHexagon(canvasContext, x, y, fill) {
        canvasContext.beginPath();
        canvasContext.moveTo(x + width / 2, y);
        canvasContext.lineTo(x + width, y + radius / 2);
        canvasContext.lineTo(x + width, y + 3 * radius / 2);
        canvasContext.lineTo(x + width / 2, y + 2 * radius);
        canvasContext.lineTo(x, y + 3 * radius / 2);
        canvasContext.lineTo(x, y + radius / 2);
        canvasContext.closePath();

        if(fill === 0) {
            canvasContext.stroke();            
        }
        else if (fill === 1) {
            canvasContext.fillStyle = blueFillStyle;
            canvasContext.fill();
        }
        else if (fill === 2) {    
            canvasContext.fillStyle = redFillStyle;
            canvasContext.fill();
        }
    }

    // Helpers placed below here for now:
    function make2dArray(width, height, initValue) {
        var array = [];

        for (var i = 0, l = width; i < l; i++) {
            array[i] = [];
            for (var j = 0; j < height; j++) {
                array[i][j] = initValue;
            }
        }

        return array;
    }
});