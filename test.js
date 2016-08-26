var Router = require('express').Router
var e = require('express')
var app = e()

Router.group = function(path, cb) {
	var group = new Router()
	this.use(path, group)
	var astr = cb.toString().replace(/(\n(.*))|(function|[\s{()])/g, '')
	var args = astr==''?[]:astr.split(',')
	cb.apply(group, args.map(function(arg){
		return group[arg].bind(group)
	}))
};

var r = new Router()
r.group('/a', function (group, get) {
	get('/b1', function (req, res) {
		res.send('a/b1')
	})
	group('/b2', function(get){
		get('/c1', function (req, res){
			res.send('a/b2/c1')
		})
	})
})
r.get('/login', function(req, res){
	res.send('test/login')
})

app.use(r)

app.listen(3000, function(){
	console.log('listen')
})