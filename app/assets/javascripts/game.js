function send_move(x, y, color){
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:3000/games/move',
    data: { 
        'x': x, 
        'y': y,
        'color': color
    },
    success: function(msg){
        //alert('Sent. Status: ' + msg);
    }});
}