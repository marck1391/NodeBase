io.on('connection', (socket)=>{
	socket.on('message', function(message){
		socket.emit('response', socket.session.user.name, message)
	})
})