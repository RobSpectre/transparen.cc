
/**
 * Module dependencies.
 */

require('coffee-script');

var express = require('express');
//  , RedisStore = require('connect-redis')(express);

//var routes = require('./routes');

var app = module.exports = express.createServer();

var io = require('socket.io').listen(app);

var configs = require('./configs')

console.log('config is ' + JSON.stringify(configs));

    
//client.auth(configs.redis.host, function() {console.log("Connected!");});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

require('./routes/index')(app)
require('./routes/proxy')(app)


// pub/sub

var redis = require('redis');
//    client = redis.createClient();

//    client = redis.createClient(configs.redis.port, configs.redis.host);
io.sockets.on('connection', function(socket){
  var subscribe = redis.createClient(configs.redis.port, configs.redis.host);
  subscribe.auth(configs.redis.password, function() {console.log("Connected!");})

  socket.on('message', function(msg){
    console.log('Received message: ' + JSON.stringify(msg));
    if (msg.action == "subscribe") {
      console.log("Subscribe on " + msg.channel);
      subscribe.subscribe(msg.channel);
    }

    if (msg.action == "unsubscribe") {
      console.log("Unsubscribe on " + msg.channel);
      subscribe.unsubscribe(msg.channel);
    }
  });

  socket.on('disconnect', function(){
    subscribe.quit();
  });

  subscribe.on('message', function(channel, message){
    console.log('Received message on channel ' + channel + " with message: " + message);
    socket.emit('message', {
      channel: channel,
      data: message
    });
  });
});


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
