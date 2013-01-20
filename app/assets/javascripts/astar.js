var JsAStar = JsAStar || {};

JsAStar.boardState = [];

JsAStar.make2dArray = function(rows, cols, initValue) {
  var i;
  var j;

  if(typeof(initValue)==='undefined') initValue = 0;

  var array = new Array(rows);
  for (i = 0; i < rows; i++) {
    array[i] = new Array(cols);
    for (j=0; j < cols; j++) {
      array[i][j] = initValue;
    }
  }
  return(array);
}

JsAStar.hex_accessible = function(x,y, allowedTile) {
  if(JsAStar.boardState[x] == undefined) return false;
  if(JsAStar.boardState[x][y] == undefined) return false;
  if(JsAStar.boardState[x][y] != allowedTile) return false;
  
  return true;
}

// Manhattan heuristic
JsAStar.hex_distance = function(x1,y1,x2,y2) {
  dx = Math.abs(x1-x2);
  dy = Math.abs(y1-y2);
  return Math.sqrt((dx*dx) + (dy*dy));
}

// Must be called before path()
JsAStar.init = function(boardWidth, boardHeight) {
  JsAStar.mapsize_x = boardWidth;
  JsAStar.mapsize_y = boardHeight;
}

// A* Pathfinding with Manhatan Heuristics for Hexagons.
JsAStar.path = function(start_x, start_y, end_x, end_y, allowedTile, boardState) {
  JsAStar.boardState = boardState;

  // Check cases path is impossible from the start.
  var error=0;
  if(start_x == end_x && start_y == end_y) error=1;
  if(!JsAStar.hex_accessible(start_x,start_y, allowedTile)) error=1;
  if(!JsAStar.hex_accessible(end_x,end_y, allowedTile)) error=1;
  if(error==1) {
    return false;
  }

  // Init
  var openlist = new Array(JsAStar.mapsize_x*JsAStar.mapsize_y+2);
  var openlist_x = new Array(JsAStar.mapsize_x);
  var openlist_y = new Array(JsAStar.mapsize_y);
  var statelist = JsAStar.make2dArray(JsAStar.mapsize_x+1,JsAStar.mapsize_y+1); // current open or closed state
  var openlist_g = JsAStar.make2dArray(JsAStar.mapsize_x+1,JsAStar.mapsize_y+1);
  var openlist_f = JsAStar.make2dArray(JsAStar.mapsize_x+1,JsAStar.mapsize_y+1);
  var openlist_h = JsAStar.make2dArray(JsAStar.mapsize_x+1,JsAStar.mapsize_y+1);
  var parent_x = JsAStar.make2dArray(JsAStar.mapsize_x+1,JsAStar.mapsize_y+1);
  var parent_y = JsAStar.make2dArray(JsAStar.mapsize_x+1,JsAStar.mapsize_y+1);

  var select_x = 0;
  var select_y = 0;
  var node_x = 0;
  var node_y = 0;
  var counter = 1; // Openlist_ID counter
  var selected_id = 0; // Actual Openlist ID
  
  // Add start coordinates to openlist.
  openlist[1] = true;
  openlist_x[1] = start_x;
  openlist_y[1] = start_y;
  openlist_f[start_x][start_y] = 0;
  openlist_h[start_x][start_y] = 0;
  openlist_g[start_x][start_y] = 0;
  statelist[start_x][start_y] = true; 
  
  // Try to find the path until the target coordinate is found
  while (statelist[end_x][end_y] != true) {
    set_first = true;
    // Find lowest F in openlist
    for (var i in openlist) {
      if(openlist[i] == true){
        select_x = openlist_x[i]; 
        select_y = openlist_y[i]; 
        if(set_first == true) {
          lowest_found = openlist_f[select_x][select_y];
          set_first = false;
        }
        if (openlist_f[select_x][select_y] <= lowest_found) {
          lowest_found = openlist_f[select_x][select_y];
          lowest_x = openlist_x[i];
          lowest_y = openlist_y[i];
          selected_id = i;
        }
      }
    }
    if(set_first==true) {
      // open_list is empty
      return false;
    }
    // add it lowest F as closed to the statelist and remove from openlist
    statelist[lowest_x][lowest_y] = 2;
    openlist[selected_id]= false;
    // Add connected nodes to the openlist
    for(i=1;i<7;i++) {
      // Run node update for 6 neighbouring tiles. 
      // Note: 6 tiles, rather than the usual 8 in square grids.
      switch(i){
        case 1:
          node_x = lowest_x-1;
          node_y = lowest_y;            
        break;
        case 2:
          node_x = lowest_x;
          node_y = lowest_y-1;            
        break;
        case 3:
          node_x = lowest_x+1;
          node_y = lowest_y-1;            
        break;
        case 4:
          node_x = lowest_x+1;
          node_y = lowest_y;            
        break;
        case 5:
          node_x = lowest_x;
          node_y = lowest_y+1;
        break;
        case 6:
          node_x = lowest_x-1;
          node_y = lowest_y+1;
        break;
      }
      if (JsAStar.hex_accessible([node_x],[node_y], allowedTile)) {
        if(statelist[node_x][node_y] == true) {
          if(openlist_g[node_x][node_y] < openlist_g[lowest_x][lowest_y]) {
            parent_x[lowest_x][lowest_y] = node_x;
            parent_y[lowest_x][lowest_y] = node_y;
            openlist_g[lowest_x][lowest_y] = openlist_g[node_x][node_y] + 10;
            openlist_f[lowest_x][lowest_y] = openlist_g[lowest_x][lowest_y] + openlist_h[lowest_x][lowest_y];
          }
        } else if (statelist[node_x][node_y] == 2) {
          // its on closed list do nothing.
        } else {
          counter++;
          // add to open list
          openlist[counter] = true;
          openlist_x[counter] = node_x;
          openlist_y[counter] = node_y;
          statelist[node_x][node_y] = true;
          // Set parent
          parent_x[node_x][node_y] = lowest_x;
          parent_y[node_x][node_y] = lowest_y;
          // update H , G and F
          var ydist = end_y - node_y;
          if ( ydist < 0 ) ydist = ydist*-1;
          var xdist = end_x - node_x;
          if ( xdist < 0 ) xdist = xdist*-1;    
          openlist_h[node_x][node_y] = JsAStar.hex_distance(node_x,node_y,end_x,end_y) * 10;
          openlist_g[node_x][node_y] = openlist_g[lowest_x][lowest_y] + 10;
          openlist_f[node_x][node_y] = openlist_g[node_x][node_y] + openlist_h[node_x][node_y];
        }
      }
    }    
  }
  
  var resultPath = [];
  resultPath.push([end_x,end_y]);

  temp_x=end_x;
  temp_y=end_y;
  counter = 0;
  while(temp_x != start_x || temp_y != start_y) {    
    lookup_x = temp_x;
    lookup_y = temp_y;
    resultPath.push([lookup_x,lookup_y]);    
    temp_x = parent_x[lookup_x][lookup_y];
    temp_y = parent_y[lookup_x][lookup_y];
    counter++;
  }
  resultPath.push([start_x,start_y]);

  return resultPath;  
}   