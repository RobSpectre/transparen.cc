routes = (app) ->
  app.get '/', (req, res) ->
    res.render 'index',
      title: 'Transparen.cc'

module.exports = routes
