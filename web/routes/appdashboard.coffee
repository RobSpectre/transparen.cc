configs = require '../configs'
redis = require 'redis'

publisher = redis.createClient(configs.redis.port, configs.redis.host)
publisher.auth configs.redis.password, () ->
  console.log "Publisher connected!"

routes = (app) ->
  app.get /^\/app\/(.+)/, (req, res) ->
    console.log 'Request parameter is ' + req

    appname = req.params[0]
    publisher.sort 'tcc:backlog', 'BY', 'endpoint', (err, data) ->
        items = (JSON.parse(item) for item in data)
        console.log 'Nunmber of item is ' +  items.length

        endpoints = (JSON.parse(item).endpoint for item in data)
        #console.log 'All endpoints are here: ' + endpoints

        res.render 'appdashboard',
            title: 'Transparen.cc - ' + appname
            log: endpoints
            appname: appname

module.exports = routes
