var mongoose = require('mongoose')
Schema = mongoose.Schema.bind(mongoose)
ObjectId = mongoose.Schema.Types.ObjectId
Model = mongoose.model.bind(mongoose)

mongoose.connect(config.dburl, (err)=>{
  console.log(err?'Database connection error':'Database connected')
})
