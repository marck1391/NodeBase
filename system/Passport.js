var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy

try{
	passport.use(new GoogleStrategy(config.google.auth,
	  function(accessToken, refreshToken, profile, cb) {
	  	cb(null, profile)
	  }
	))
	passport.serializeUser(function(user, cb) {
	  cb(null, user);
	});

	passport.deserializeUser(function(obj, cb) {
	  cb(null, obj);
	});
	
}catch(e){
	console.warn('Google OAuth invalid config')
}

app.use(passport.initialize())
app.use(passport.session())