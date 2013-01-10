$(document).ready(function() {
	var canvas = document.getElementById('hexmap');

	var tileRadius = 23;
	var tileWidth = tileRadius * Math.sqrt(3);
	var padding = 30;

	var boardWidth = 11;
	var boardHeight = 11;

	var boardState = make2dArray(boardWidth, boardHeight, 0);

	var bluePlayersTurn = true;

	paper.setup(canvas);

	tool1 = new paper.Tool();
  tool1.onMouseUp = function(event) {
  	var hitTestResult = paper.project.hitTest(event.point);
  	var tileClickedOn = hitTestResult.item;
  	var clickedX = tileClickedOn.hexX;
  	var clickedY = tileClickedOn.hexY;

  	// Check if we've clicked on a Hex tile
  	if (tileClickedOn.hexItemType === 'hex'){
  		// Check if the Hex tile we clicked is blank
  		if (boardState[clickedX][clickedY] === 0){
	  		if (bluePlayersTurn){
	  			tileClickedOn.fillColor = 'blue';
	  			boardState[clickedX][clickedY] = 1;
	  			bluePlayersTurn = !bluePlayersTurn;			
	  		}
	  		else {
	  			tileClickedOn.fillColor = 'red';
	  			boardState[clickedX][clickedY] = 2;
	  			bluePlayersTurn = !bluePlayersTurn;
	  		}
  		}
  	}
  }

	var rectangle = new paper.Rectangle(new paper.Point(3, 3), new paper.Point(canvas.width-3, canvas.height-3));
	var cornerSize = new paper.Size(20, 20);
	var path = new paper.Path.RoundRectangle(rectangle, cornerSize);
	path.strokeColor = 'red';
	path.fillColor = '#eee';

	for (var i = 0; i < boardWidth; i++) {    
	  for (var j = 0; j < boardHeight; j++) {
	    var hexagonPosition = new paper.Point(padding + (i * tileWidth + j * tileWidth / 2), padding + (j * 3 * tileRadius / 2));
	    var hexagon = paper.Path.RegularPolygon(hexagonPosition, 6, tileRadius);

	    hexagon.strokeColor = 'black';
	    hexagon.fillColor = 'white';

	    hexagon.hexItemType = 'hex';
	    hexagon.hexX = i;
	    hexagon.hexY = j;
	  };
	}; 

	paper.view.draw();

});

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