'use strict'

var path = require('path');

module.exports.init = function(app) {
	var routesPath = path.join(app.get('root'), '../app/routes');
	
	// tmo subpage --------------------------------------
	// 1. authentication routing
	app.use('/', require(path.join(routesPath, '/authenticate')));
	// 2. news routing
	app.use('/', require(path.join(routesPath, '/news')));
	// --------------------------------------------------
	// to do admin
	// to do cup subpage
	// to do ladder subpage
    // to create necessary environment
    app.use('/create', require(path.join(routesPath, '/create')));
	
	// handling unwilled request?
	app.get('/*', function (req, res) {
		console.log('got get 404 request to ' + req.url);
		res.send('testCATCHget');
	});
	
	app.post('/*', function(req, res) {
		console.log('got post 404 request to ' + req.url);
		res.send('testCATCHpost');
	});
};