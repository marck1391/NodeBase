//TODO:Config for each service
var path = require('path')
module.exports = {
  url: process.env.URL,
  host: process.env.HOST||'0.0.0.0',
  port: process.env.PORT||3000,
  session: {
    type: 'mongo',
		secret: ':.8dKCWQ]4fs/Q!jCu)]Z+4PQ8asFS=t',
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
  dburl: process.env.MONGO_URL,
  //Pusher
  pusher: {
    appId: process.env.PUSHER_API_ID,
    key: process.env.PUSHER_API_KEY,
    secret: process.env.PUSHER_API_SECRET,
    encrypted: true
  },
  google: {
    auth: {
      clientID: process.env.GOOGLE_AUTH_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
      callbackURL: process.env.URL+"auth/google/callback"
    }
  }
}

console.log('%casdasd', 'background-color: #ff9900')