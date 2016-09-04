require('dotenv').config()
config = require('./app/config')

require('./system/Debug')
require('./system/server')

process.on('uncaughtException', function(err){
	console.error(err)
	process.exit(1)
})