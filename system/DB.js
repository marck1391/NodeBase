var mongoose = require('mongoose')
Schema = mongoose.Schema.bind(mongoose)
ObjectId = mongoose.Schema.Types.ObjectId
Model = mongoose.model.bind(mongoose)

module.exports.connect = (cb)=>{
	return mongoose.connect('mongodb://localhost/dbnames', (err)=>{
		if(err)
			console.error('Database connection error')
		else
			console.info('Database connected')
		cb(err)
	})	
}
