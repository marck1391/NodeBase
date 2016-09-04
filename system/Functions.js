var path = require('path')
var http = require('http')
var _ = require('underscore')

baseurl = (asset)=>{
  return path.join(config.url, asset)
}

assets = (asset)=>{
  return path.join(config.assets, asset)
}

style = (file)=>{
  return assets(path.join('css', file+'.css'))
}

script = (file)=>{
  return assets(path.join('js', file+'.js'))
}

route = function(controller){
  var middlewares = []
  var name = typeof arguments[1]=='string'?arguments[1]:arguments[2]
  var middlewares = _.filter(arguments, isArray)[0]||[]
  return {controller, middlewares, name}
}

url = function(name){
  if(!name) return '/'
  var fullUrl = _.filter(arguments, isBoolean)[0]?config.url.replace(/\/$/,''):''
  var route = _.map(require('../app/routes'), function(value, key, list){
    if(value.name==name){
      return key
    }
  }).filter(notNull).pop()
  if(!route) return '/'
  var params = _.filter(arguments, isNotBoolean)
  params.shift()
  
  return fullUrl+route.split(' ').pop().replace(/(\/:\w+\??)/g, function (m, c) { 
    c = c.replace(/[/:?]/g, '')
    return c ? '/' + params.shift() : ""
  }); 
}

//Decorators
override = function(object, methodname, callback){
  object[methodname] = callback(object[methodname]).bind(object)
}

before = function(extraBehavior){
  return function(original){
    return function(){
      extraBehavior.apply(this, arguments)
      return original.apply(this, arguments)
    }
  }
}

compose = function(modifier){
  return function(original){
    return function(){
      var res = modifier.apply(this, arguments)
      if(!res) return;
      return original.call(this, res)
    }
  }
}

http.ServerResponse.prototype.view = function(view, data){
  this.render(view, Object.assign(this.req.data, data||{}))
}

function notNull(value){
  return value!==undefined
}
function isBoolean(value){
  return typeof value=='boolean'
}
function isNotBoolean(value){
  return typeof value!='boolean'
}

function isArray(value){
  return Array.isArray(value)
}