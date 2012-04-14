 $('document').ready(function() {  
      var socket = io.connect('http://localhost:3000');
     
      socket.on('connect', function(){
        socket.emit('message', {action: 'subscribe', channel: 'tcc'});
        console.log("Connected.");
        $('#displayarea').append("Connected to pub/sub.<br>");
      });

      socket.on('message', function(msg){
        console.log("Received message for node: " + msg.data);
        $('#displayarea').append("Received message: " + msg.data + "<br>");
      });
    });
