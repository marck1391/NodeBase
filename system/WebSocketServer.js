var cookieParser = require('cookie-parser')

io = require('socket.io')(server)

io.use(function(socket, next){
	cookieParser(config.session.secret)(socket.request, socket.request.res, next)
})

io.use(function(socket, next){
	var signedCookies = socket.request.signedCookies;
	if(signedCookies==undefined)
		return next(new Error('cookies'))
	if(signedCookies['connect.sid']==undefined)
		return next(new Error('sid'))

	SessionStorage.get(signedCookies['connect.sid'], function (err, session) {
		if(err||!session){
			return next(new Error('session'))
		}
		if(session.user==undefined){
			return next(new Error('login'))
		}
		socket.sid = signedCookies['connect.sid']
		socket.session = session
		next()
	})
})