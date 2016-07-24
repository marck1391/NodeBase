//TODO:Error handler
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var session = require('./Session')
var routes = require('../app/routes')

require('./DB')
require('./Functions')

_root = process.env.PWD

app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:  true}))
app.set('view engine', config.viewEngine)
app.use(config.assets, express.static(_root+'/assets'))
for(var path in config.staticContent){
  if(config.staticContent.hasOwnProperty(path))
    app.use(config.assets, express.static(_root+path))
}
app.use(cookieParser(config.session.secret))
app.use(session())

app.use(function(req, res, next){
  req.data = {isUser: req.session.loggedin}
  res.view = function(view){
    res.render(view, req.data)
  }
  next()
})

fs.readdir('./app/Models', (err, models)=>{
  if(err) return;
  models.forEach((model, i)=>{
    require('../app/Models/'+model)
  })
})

fs.readdir('./app/Services', (err, services)=>{
  if(err) return;
  services.forEach((service, i)=>{
    require('../app/Services/'+service)
  })
})

for(route in routes){
  var [ctrlname, func] = (typeof routes[route]=='object'?
    routes[route].controller:
    routes[route]).split('.')
  var mws = routes[route].middlewares||[]
  if(ctrlname.charAt(0)=='!'){
    mws.push('Auth')
  }else if(ctrlname.charAt(0)=='?')
    mws.push('Guest')
  ctrlname = ctrlname.replace(/[!?]/g, '')
  var [route, method] = route.split(' ').reverse()
  var routeParams = [route]
  mws.forEach(function(mw, i){
    routeParams.push(require('../app/Middlewares/'+mw))
  })
  routeParams.push(require('../app/Controllers/'+ctrlname)[func])
  app[method||'get'].apply(app, routeParams)
}


module.exports = {
  listen: (port, host)=>{
    server = app.listen(config.port, config.host, ()=>{
      console.log(
        'Listening on %s:%d',
        server.address().address,
        server.address().port
      )
    })
    require('./WebSocketServer')
    require('../app/WSS')
  }
}