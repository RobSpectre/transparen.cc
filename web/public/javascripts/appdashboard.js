
var r = Raphael('rholder');

var pieval = [1,1];

var jsonmsg;

$('document').ready(function() {

  var endpoints = data.split(',');
  var counts = {};
  for(var i=0; i<endpoints.length; i++) {
    var shortstr = endpoints[i].replace('me/', '')
    if(counts[shortstr])
      counts[shortstr] += 1;
    else
      counts[shortstr] = 1;
  }

  var graphdata = [];
  var legenddata = [];
  for(var x in counts) {
    graphdata.push(counts[x]);
    legenddata.push(x);
  }
  setupPie(graphdata, legenddata);
  

    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function(){
        socket.emit('message', {action: 'subscribe', channel: 'tcc'});
        console.log("Connected.");
    });
    
    socket.on('message', function(){
    });

});

function setupPie(piedata, legenddata) {
  r.clear();
  // Creates pie chart at with center at 320, 200,
  // radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
  var pie = r.piechart(350, 170, 170, piedata.slice(), { legend: legenddata, legendpos: "east" });

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

