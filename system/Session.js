var Session = require('express-session')

var storages = {
	'memory': Session.MemoryStore,
	'redis': require('connect-redis')(Session),
	'mongo': require('connect-mongo')(Session)
}

SessionStorage = {}

module.exports = function(){
	var opts = config.session.options
	var type = config.session.type

	SessionStorage = new storages[type||'memory'](opts[type]||{})
	config.session.store = SessionStorage
	return Session(config.session)
}
