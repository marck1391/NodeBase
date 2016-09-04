var fs = require('fs')

var Config = {
  url: process.env.URL,
  host: process.env.HOST||'0.0.0.0',
  port: process.env.PORT||3000,
  session: {
    type: 'mongo',
		secret: process.env.SECRET,
		cookie: { maxAge: 25200000 },
		resave: false,
		saveUninitialized: true,
    options: {
      mongo: {
        url: process.env.MONGO_URL
      }
    }
	},
  assets: '/',
  viewEngine: 'ejs',
  dburl: process.env.MONGO_URL
}

module.exports = Config

fs.readdir('./app/Config', (err, cfgs)=>{
  if(err) return;
  cfgs.forEach((cfg, i)=>{
    require('../app/Config/'+cfg)
  })
})