//TODO:dotenv
module.exports = {
  url: 'http://localhost:3000/',
  host: process.env.HOST||'0.0.0.0',
  port: process.env.PORT||3000,
  session: {
    type: 'mongo',
		secret: ':.8dKCWQ]4fs/Q!jCu)]Z+4PQ8asFS=t',
		cookie: { maxAge: 25200000 },
		resave: false,
		saveUninitialized: true,
    options: {
    }
	},
  assets: '/',
  viewEngine: 'ejs',
  dburl: 'mongodb://localhost/dbname',
}
