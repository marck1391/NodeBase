var util = require('util')
var colors = require('colors')
require('../system/Functions')
//Config
debug = true
showDate = false
showLine = true
showFile = true
showColors = true

class Trace extends Error{
	get file(){
		return this.parseStack[0]
	}
	get line(){
		return this.parseStack[1]
	}
	get column(){
		return this.parseStack[2]
	}
	get parseStack() {
		if(!this.stack) return '?'
		//TODO: Incorrect error line
		var line = this.stack.split('\n')[4]
		var file = line.split(' (')[1]
		line = (line.indexOf(' (') >= 0
			? file.substring(0, file.length - 1)
			: line.split('at ')[1]
			);
		return line.split(':')
	}
}

function colorLog(color){
	return function(){
		if(!debug) return;
		if(!showColors) return util.format.apply(util, arguments)
		var args = [...arguments].map(arg=>{
			if(typeof arg === 'object' && !Array.isArray(arg))
				arg = util.inspect(arg)
			else if(arg===undefined)
				arg = 'undefined'
			return (arg||'null')
		})
		var trace = new Trace()
		if(trace.file.includes('node_modules')) return;
		var info = ''
		if(showDate)
			info += logDate().white.bold
		if(showLine)
			info += `[${showFile?trace.file+':':''}${trace.line}:${trace.column}]`.cyan
		var str = util.format.apply(util, args)
		str = (info!=''?info+' ':'')+str[color]
		return str
	}
}

function logDate(){
	return '['+(new Date()).toISOString().replace(/(.*)?T(\d+:\d+:\d+).*/, "$1 $2")+']';
}

override(console, 'log', compose(colorLog('green')))
override(console, 'info', compose(colorLog('blue')))
override(console, 'error', compose(colorLog('red')))
override(console, 'warn', compose(colorLog('yellow')))