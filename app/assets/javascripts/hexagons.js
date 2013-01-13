var initGame = function(boardWidth, boardHeight) {
  var canvas = document.getElementById('hexmap');

  if(typeof(boardWidth)==='undefined') boardWidth = 11;
  if(typeof(boardHeight)==='undefined') boardHeight = 11;

  var tileRadius = 22;
  var tileWidth = tileRadius * Math.sqrt(3);
  var padding = 64;

  var drawBackground = false;

  var boardState = make2dArray(boardWidth, boardHeight, 0);

  var bluePlayersTurn = true;

  var turnIndicator;

  paper.setup(canvas);

  tool1 = new paper.Tool();
  tool1.onMouseDown = function(event) {
    var hitTestResult = paper.project.hitTest(event.point);

    if (hitTestResult === null)
      return;

    var tileClickedOn = hitTestResult.item;

    if (tileClickedOn === null)
      return;

    var clickedX = tileClickedOn.hexX;
    var clickedY = tileClickedOn.hexY;

    // Check if we've clicked on a Hex tile
    if (tileClickedOn.hexItemType === 'hex'){
      // Check if the Hex tile we clicked is blank
      if (boardState[clickedX][clickedY] === 0){
        if (bluePlayersTurn){
          tileClickedOn.fillColor = 'blue';
          boardState[clickedX][clickedY] = 1;
        }
        else {
          tileClickedOn.fillColor = 'red';
          boardState[clickedX][clickedY] = 2;
        }
        bluePlayersTurn = !bluePlayersTurn;
        updateTurnIndicator();
      }
    }
  };

  if (drawBackground){
    // Create background
    var rectangle = new paper.Rectangle(new paper.Point(3, 3), new paper.Point(canvas.width-3, canvas.height-3));
    var cornerSize = new paper.Size(20, 20);
    var path = new paper.Path.RoundRectangle(rectangle, cornerSize);
    path.strokeColor = 'red';
    path.fillColor = '#eee';
  }

  // Create hex tile board
  for (var i = 0; i < boardWidth; i++) {
    for (var j = 0; j < boardHeight; j++) {
      var hexagonPosition = new paper.Point(padding + (i * tileWidth + j * tileWidth / 2), padding + (j * 3 * tileRadius / 2));
      var hexagon = paper.Path.RegularPolygon(hexagonPosition, 6, tileRadius);

      hexagon.strokeColor = 'black';
      hexagon.fillColor = 'lightgray';

      hexagon.hexItemType = 'hex';
      hexagon.hexX = i;
      hexagon.hexY = j;
    };
  };

  // Create hex tile goal tiles (blue)
  for (var i = -1; i < boardWidth + 1; i++) {
    for (var j = -1; j < boardHeight + 1; j++) {
      if ((i === -1 && j > -1 && j < boardHeight) || (i === boardWidth && j > -1 && j < boardHeight)){
        var hexagonPosition = new paper.Point(padding + (i * tileWidth + j * tileWidth / 2), padding + (j * 3 * tileRadius / 2));
        var hexagon = paper.Path.RegularPolygon(hexagonPosition, 6, tileRadius);

        hexagon.strokeColor = 'black';
        hexagon.fillColor = 'darkblue';

        hexagon.hexItemType = 'blueGoal';
        hexagon.hexX = i;
        hexagon.hexY = j;

        var text = new paper.PointText(hexagonPosition);
        text.justification = 'center';
        text.fillColor = 'white';
        text.position.y += tileRadius / 5;
        text.content = j + 1;
      }
    };
  };

  // Create hex tile goal tiles (red)
  for (var i = -1; i < boardWidth + 1; i++) {
    for (var j = -1; j < boardHeight + 1; j++) {
      if ((j === -1 && i > -1 && i < boardWidth) || (j === boardHeight && i > -1 && i < boardWidth)){
        var hexagonPosition = new paper.Point(padding + (i * tileWidth + j * tileWidth / 2), padding + (j * 3 * tileRadius / 2));
        var hexagon = paper.Path.RegularPolygon(hexagonPosition, 6, tileRadius);

        hexagon.strokeColor = 'black';
        hexagon.fillColor = 'darkred';

        hexagon.hexItemType = 'redGoal';
        hexagon.hexX = i;
        hexagon.hexY = j;

        var text = new paper.PointText(hexagonPosition);
        text.justification = 'center';
        text.fillColor = 'white';
        text.position.y += tileRadius / 5;
        text.content = String.fromCharCode(64 + i + 1);
      }
    };
  };

  turnIndicator = new paper.PointText(new paper.Point(padding, canvas.height - 180));
  turnIndicator.justification = 'center';
  turnIndicator.fillColor = 'black';
  updateTurnIndicator();

  paper.view.draw();

  function updateTurnIndicator() {
    if (bluePlayersTurn) {
      turnIndicator.content = "Blue's turn.";
    } else {
      turnIndicator.content = "Red's turn.";
    }
  }
};


function make2dArray(width, height, initValue){
  var array = []
  for (var i = 0; i < width; i++) {
      array[i] = [];
      for (var j = 0; j < height; j++) {
        array[i][j] = initValue;
      };
  };

  return array;
}
