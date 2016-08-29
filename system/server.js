//TODO:passport
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var helmet = require('helmet')
var fs = require('fs')
var http = require('http')

_root = process.env.PWD

var routes = require('../app/routes')
var db = require('./DB')
var session = require('./Session')

db.connect((err)=>{
  if(err){
    console.info('Server can\'t start')
    console.error(err)
    process.exit(1)
  }
  app = express()

  app.disable('x-powered-by');
  app.use(helmet())
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
  app.use((req, res, next)=>{
    app.locals.isUser = req.session.loggedin
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
    mws.forEach((mw, i)=>{
      routeParams.push(require('../app/Middlewares/'+mw))
    })
    routeParams.push(require('../app/Controllers/'+ctrlname)[func])
    app[method||'get'].apply(app, routeParams)
  }

  app.use((req, res, next)=>{
    res.status(404).send('Not found')
  })

  app.use((err, req, res, next)=>{
    //console.error(err)
    res.status(500).send('error')
  })
  
  server = app.listen(config.port, config.host, ()=>{
    console.log(
      'Server listening on http://%s:%d',
      server.address().address,
      server.address().port
    )
    require('./Functions')
    require('./WebSocketServer')
    require('../app/WSS')
  })
})
//process.on('uncaughtException', function(err){
  //res.status(500).json({success: false, error: err.message})
//})