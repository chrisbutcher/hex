//var localhost = 'http://192.168.1.100:3000';
var localhost = 'http://0.0.0.0:3000';

function send_move(x, y, color){
  $.ajax({
    type: 'POST',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', csrf_token)},
    url: localhost + '/games/move',
    data: { 
        'x': x, 
        'y': y,
        'color': color
    },
    success: function(response){
        //alert('Sent. Status: ' + response);
    }});
}

function whos_turn(playerNumber){
  $.ajax({
    type: 'POST',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', csrf_token)},
    url: localhost + '/games/update',
    data: { 
        'playerNumber': playerNumber
    },
    success: function(response){
        console.log('Player turn = ' + response['current_player_id'] + ' local player = ' + playerNumber.toString());
        if (response['current_player_id'].toString() === playerNumber.toString()){
          if (localPlayersTurn === false){
            localPlayersTurn = !localPlayersTurn;
            updateTurnIndicator();
            paper.view.draw();

            updateBoard(response['board_state']);
          }
        }
    },
    complete: function () {
      setTimeout(function () { whos_turn(playerNumber) }, 3000)
    }
  });
}