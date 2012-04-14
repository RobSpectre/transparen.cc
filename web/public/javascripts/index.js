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

        
// Creates canvas 640 × 480 at 10, 50
var r = Raphael(10, 50, 640, 480);
// Creates pie chart at with center at 320, 200,
// radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
var pie = r.piechart(320, 240, 100, [55, 20, 13, 32, 5, 1, 2]);

pie.hover(function () {
   this.sector.stop();
   this.sector.scale(1.1, 1.1, this.cx, this.cy);

   if (this.label) {
     this.label[0].stop();
     this.label[0].attr({ r: 7.5 });
     this.label[1].attr({ "font-weight": 800 });
   }
}, function () {
  this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
  if (this.label) {
    this.label[0].animate({ r: 5 }, 500, "bounce");
    this.label[1].attr({ "font-weight": 400 });
  }

});






       
