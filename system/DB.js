var mongoose = require('mongoose')
Schema = mongoose.Schema.bind(mongoose)
ObjectId = mongoose.Schema.Types.ObjectId
Model = mongoose.model.bind(mongoose)

module.exports.connect = (cb)=>{
	var connection = mongoose.connect(config.dburl, (err)=>{
		console.error(err?'Database connection error':'Database connected')
		cb(err, connection)
	})	
}
