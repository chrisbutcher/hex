var initGame = function(boardWidth, boardHeight, cpuPlayerEnabled) {
  var canvas = document.getElementById('hexmap');
  
  if (canvas===null){
    console.log('Hex: Canvas could not be initialized.');
    return;
  }

  if(typeof(boardWidth)==='undefined') boardWidth = 11;
  if(typeof(boardHeight)==='undefined') boardHeight = 11;
  if(typeof(cpuPlayerEnabled)==='undefined') cpuPlayerEnabled = false;

  var tileRadius = Math.min(canvas.width / (Math.sqrt(3) * ((boardWidth+1) +(boardHeight+1)/2)),
                       canvas.height / (3 * (boardHeight+1) / 2));

  var tileWidth = tileRadius * Math.sqrt(3);  
  var padding = tileWidth * 1.5;

  var drawBackground = false;
  var bluePlayersTurn = true;
  var turnIndicator = null;

  var gameWon = false;

  var mapsize_x = boardWidth;
  var mapsize_y = boardHeight;
  JsAStar.init(boardWidth, boardHeight);

  var boardState = JsAStar.make2dArray(mapsize_x,mapsize_y, 0);

  var hexTiles = []

  paper.setup(canvas);

  tool1 = new paper.Tool();
  tool1.onMouseDown = function(event) {
    if (gameWon)
      return;

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

        if (bluePlayersTurn)
          checkWin(1);
        else{
          if (!cpuPlayerEnabled)
            checkWin(2);
        }

        bluePlayersTurn = !bluePlayersTurn;
        updateTurnIndicator();

        if (cpuPlayerEnabled)
          cpuPlayerTick();
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
    hexTiles[i] = []
    for (var j = 0; j < boardHeight; j++) {
      var hexagonPosition = new paper.Point(padding + (i * tileWidth + j * tileWidth / 2), padding + (j * 3 * tileRadius / 2));
      var hexagon = paper.Path.RegularPolygon(hexagonPosition, 6, tileRadius);

      hexagon.strokeColor = 'black';
      hexagon.fillColor = 'lightgray';

      hexagon.hexItemType = 'hex';
      hexagon.hexX = i;
      hexagon.hexY = j;

      hexTiles[i][j] = hexagon;
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
        text.content = String.fromCharCode(65 + i);
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

  // For now, The CPU player simply picks a random free tile
  function cpuPlayerTick(){    

    if (gameWon)
      return;

    // Store positions of free tiles
    var freeTileSpots = [];
    for (i = 0; i < boardWidth; i++){
      for (j = 0; j < boardHeight; j++){
        if (boardState[i][j] === 0){
          freeTileSpots.push([i,j]);
        }
      }
    }

    // Check that we found some free tiles
    if (freeTileSpots.length < 1)
      return;

    // Randomly pick one
    var random = Math.floor(Math.random() * (freeTileSpots.length));
    var randomX = freeTileSpots[random][0];
    var randomY = freeTileSpots[random][1];

    // Pick that tile and colour it
    // For now, we're manually syncing between the hexTiles paper.js Path array
    // and the boardState array that can be used for remote sync and win-checking
    boardState[randomX][randomY] = 2;
    hexTiles[randomX][randomY].fillColor = 'red';

    checkWin(2);

    // Change turns
    bluePlayersTurn = true;
    updateTurnIndicator();
  }

  function checkWin(playerCode) {
    for (i = 0; i < boardWidth; i++){
      for (j = 0; j < boardWidth; j++){
        if (playerCode === 1)
          var result =  JsAStar.path(0, i, boardWidth-1, j, playerCode, boardState);
        else
          var result =  JsAStar.path(i, 0, j, boardHeight-1, playerCode, boardState);

        if (result != false){
          if (playerCode === 1)
            alert("Blue wins");
          else
            alert("Red wins");

          gameWon = true;

          for (i = 0; i < result.length; i++)
            hexTiles[result[i][0]][result[i][1]].fillColor = 'yellow';          

          return;
        }
      }
    }    
  }
}; // end of initGame()