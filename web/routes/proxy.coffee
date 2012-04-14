rest = require 'restler'
configs = require '../configs'

token = configs.access_token

routes = (app) ->
  app.get /^\/proxy\/(.+)(\?.+)?/, (req, res) ->
    url = 'https://graph.facebook.com/'+req.params[0]+'?access_token='+token+'&'+req.params[1]
    console.log "URL is " + url

    rest.get(url).on 'complete', (data) ->
      console.log "something here: " + data
      res.send data
    
#    res.render 'index',
#      title: 'Transparen.cc'

module.exports = routes
