var path = require('path')

module.exports = ()=>{
	app.locals.baseurl = (asset)=>{
	  return path.join(config.url, asset)
	}

	app.locals.assets = (asset)=>{
	  return path.join(config.assets, asset)
	}

	app.locals.style = (file)=>{
	  return assets(path.join('css', file+'.css'))
	}

	app.locals.script = (file)=>{
	  return assets(path.join('js', file+'.js'))
	}
}
