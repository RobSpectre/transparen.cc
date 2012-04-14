var r = Raphael(10, 50, 640, 480);

var pieval = [1,1];

var jsonmsg;

$('document').ready(function() {  

      var socket = io.connect('http://localhost:3000');
     
      socket.on('connect', function(){
        socket.emit('message', {action: 'subscribe', channel: 'tcc'});
        console.log("Connected.");
        $('#displayarea').append("Connected to pub/sub.<br>");
      });

      socket.on('message', function(msg){
        jsonmsg = msg.data;
        appdata = JSON.parse(jsonmsg);

         

        console.log("Received message for node: " + msg.data);
        $('#displayarea').append("API call detected from <b>" + appdata.appname + "</b> at <b>" + appdata.endpoint + "</b>. Returned <b>" + appdata.data.length + " bytes</b> of data<br>");
       
        
        pieval[msg.data.length % 2]++;
        setupPie(pieval);
      });
    });

       

function setupPie(piedata) {
  r.clear();
  // Creates pie chart at with center at 320, 200,
  // radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
  var pie = r.piechart(320, 240, 100, piedata.slice());

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
}






       
