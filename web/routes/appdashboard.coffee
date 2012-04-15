configs = require '../configs'
redis = require 'redis'

publisher = redis.createClient(configs.redis.port, configs.redis.host)
publisher.auth configs.redis.password, () ->
  console.log "Publisher connected!"

routes = (app) ->
  app.get /^\/app\/(.+)/, (req, res) ->
    appname = req.params[0]
    publisher.sort 'tcc:backlog', 'BY', 'endpoint', (err, data) ->
        items = (JSON.parse(item) for item in data)
        res.render 'appdashboard',
            title: 'Transparen.cc - ' + appname
            log: items
            appname: appname

module.exports = routes
