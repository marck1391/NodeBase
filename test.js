config = require('./app/config')
var db = require('./system/DB')
var mongoose = require('mongoose')
var assert = require('assert')
var Schema = mongoose.Schema
var Model = mongoose.model.bind(mongoose)

var testSchema = new Schema({
	name: {type: String, trim: true, lowercase: true},
	email: {type: String, trim: true, lowercase: true}
})

testSchema.methods.hola = function(cb){
	this.save(function(err){
		cb(err)
	})
}

testSchema.pre('hola', function(next){
	var test = this
	Test.findOne({$or: [{email: test.email}, {name: test.name}]}, function(err, doc){
		/*if(doc){
			if(doc.name==test.name) message = 'Username already in use'
			else if(doc.email==test.email) message = 'Email already registered'
			return next(new Error(message))
		}*/
		next(err)
	})
})

var Test = mongoose.model('Test2', testSchema)

db.connect(function(err){
	var t = new Test()
	t.name = 'Marks2'
	t.email = 'adminssss@mark.com'
	t.hola(function(err){
		console.log('yeah', err)
	})
})