
var pieval = [1,1];

var jsonmsg;

$('document').ready(function() {  

      

      $("td.timeago").timeago();
      var socket = io.connect('http://tcc.nodejitsu.com');
     
      $("td.timeago").timeago();

      socket.on('connect', function(){
        socket.emit('message', {action: 'subscribe', channel: 'tcc'});
        console.log("Connected.");
        $('#displayarea').append("Connected to pub/sub.<br>");
      });

      socket.on('message', function(msg){
        jsonmsg = msg.data;
        appdata = JSON.parse(jsonmsg);
        m = new moment(appdata.timestamp);
         

        console.log("Received message for node: " + msg.data);
        $('#auditlog tr:first').after('<tr><td class="timeago" title="' + appdata.timestamp + '">' + appdata.timestamp + '</td><td>' + appdata.appname + '</td><td>' + appdata.endpoint.replace('me/', '') + '</td><td>' + appdata.data.length + '</td></tr>');
        

        $("td.timeago").timeago();

        pieval[msg.data.length % 2]++;
        //setupPie(pieval);
      });
    });

       

