var path = require('path')
var colors = require('colors')
var http = require('http')

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