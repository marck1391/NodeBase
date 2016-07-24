var path = require('path')

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
