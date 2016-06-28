'use strict'

var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');

module.exports.init = function(app) {
	var root = app.get('root');
	var logDirectory = path.join(root, '../log');
	
	// ensure log directory exists
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
	
	// create rotating write stream
	var accessLogStream = FileStreamRotator.getStream({
		date_format: 'YYYYMMDD',
		filename: logDirectory + '/access-%DATE%.log',
		frequency: 'daily',
		verbose: false
	});
	
	// setup the logger
	app.use(morgan('combined', { stream: accessLogStream }));
};