'use strict';

/**
* Set node environment from config
*/
process.env.NODE_ENV = 'production';
//process.env.NODE_ENV = config.nodeEnv;
console.log(process.env.NODE_ENV);

var http = require('http');
var express = require('express');
var config = require('../config/config');
var app = express();
var server;

/**
*Set express (app) variables
*/
app.set('config', config);
app.set('root', __dirname);

require('../config/morgan').init(app);
require('../config/mongoose').init(app);
require('../config/models').init(app);
require('../config/passport').init(app);
require('../config/express').init(app); // contains connect-mongose for session-storage
require('../config/routes').init(app); // zainicjalizowane w express przez static /public - test na unwilled req.

/**
* Start the app if not loaded by another module
**/
if(!module.parent) {
	server = http.createServer(app);
	server.listen(config.port || 3000, function() {
    //server.listen(process.env.OPENSHIFT_NODEJS_PORT || config.port, process.env.OPENSHIFT_NODEJS_IP || config.hostname, function () {
		var addr = server.address();
		console.log(
			'%s is running, listening on %s:%s',
			config.app.name,
			addr.address,
			addr.port
		);
	});
}

module.exports = app;