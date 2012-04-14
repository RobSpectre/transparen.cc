rest = require 'restler'
configs = require '../configs'

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
      console.log "something here: " + data
      res.send data

module.exports = routes
