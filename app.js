config = require('./app/config')

require('./system/server')
	.listen(config.port, config.host)