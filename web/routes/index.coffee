configs = require '../configs'
redis = require 'redis'

publisher = redis.createClient(configs.redis.port, configs.redis.host)
publisher.auth configs.redis.password, () ->
  console.log "Publisher connected!"

routes = (app) ->
  app.get '/', (req, res) ->
    publisher.lrange 'tcc:backlog', 0, 20, (err, data) ->
        console.log(data)
        items = (JSON.parse(item) for item in data) 
        res.render 'index',
          title: 'Transparen.cc'
          log: items

module.exports = routes
