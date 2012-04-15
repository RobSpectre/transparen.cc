rest = require 'restler'
configs = require '../configs'
redis = require 'redis'

publisher = redis.createClient(configs.redis.port, configs.redis.host)
publisher.auth configs.redis.password, () ->
  console.log "Publisher connected!"



routes = (app) ->
  app.get /^\/proxy\/(.+)/, (req, res) ->
    app_name = 'Super Fun App'
    req_endpoint = req.params[0]
    queries = req.query
    
    if configs.access_token
      queries['access_token'] = configs.access_token

    querystring = for key, val of queries
          "#{key}=#{val}"
    
    console.log JSON.stringify(querystring)

    url = 'https://graph.facebook.com/' + req_endpoint + '?' + querystring.join('&')

    console.log "URL is " + url

    rest.get(url).on 'complete', (data) ->
      delete queries['access_token']
      topublish =
          appname: app_name
          endpoint: req_endpoint
          querystring: queries
          timestamp: new Date()
          data : data

      publisher.publish('tcc', JSON.stringify(topublish))
      publisher.lpush('tcc:backlog', JSON.stringify(topublish))
      res.send data

module.exports = routes
