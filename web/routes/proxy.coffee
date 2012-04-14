rest = require 'restler'
configs = require '../configs'
redis = require 'redis'

publisher = redis.createClient(configs.redis.port, configs.redis.host)
publisher.auth configs.redis.password, () ->
  console.log "Publisher connected!"



routes = (app) ->
  app.get /^\/proxy\/(.+)/, (req, res) ->
    req_endpoint = req.params[0]
    
    if configs.access_token
      req.query['access_token'] = configs.access_token

    querystring = for key, val of req.query
          "#{key}=#{val}"
    
    console.log JSON.stringify(querystring)

    url = 'https://graph.facebook.com/' + req_endpoint + '?' + querystring.join('&')

    console.log "URL is " + url

    rest.get(url).on 'complete', (data) ->
      publisher.publish('tcc', data)
      console.log "publisher is work? "
      res.send data

module.exports = routes
