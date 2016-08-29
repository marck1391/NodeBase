var path = require('path')
var colors = require('colors')

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

logDate = function(){
	return '['+(new Date()).toISOString().replace(/(.*)?T(\d+:\d+:\d+).*/, "$1 $2")+']';
}

/*function Singleton(enable){
	if (arguments.callee._singletonInstance) {
		return arguments.callee._singletonInstance
	}
	arguments.callee._singletonInstance = this
	this.showdate = true
}*/

//Decorators
override = function(object, methodname, callback){
	object[methodname] = callback(object[methodname])
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