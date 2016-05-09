'use strict'

var mongoose = require('mongoose');

module.exports.init = function(app) {
	var config = app.get('config');
	
	mongoose.connect(config.mongodb.uri);
	
	// If the Node process ends, cleanup existing connections
	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);
	process.on('SIGHUP', cleanup);
	
	if (app) {
		app.set('mongoose', mongoose);
	}
	
	return mongoose;
};

function cleanup() {
	mongoose.connection.close(function() {
		console.log('function cleanup was called to remove existing mongodb connections!');
		process.exit(0);
	});
}