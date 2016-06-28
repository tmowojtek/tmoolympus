'use strict'

var path = require('path');

module.exports.init = function(app) {
	var routesPath = path.join(app.get('root'), '../app/routes');
	
	// tmo subpage --------------------------------------
	// 1. authentication routing
	app.use('/', require(path.join(routesPath, '/authenticate')));
	// 2. news routing
	app.use('/', require(path.join(routesPath, '/news')));
    // 3. apply routing
    app.use('/apply', require(path.join(routesPath, '/apply')));
    // 4. history routing
    app.use('/history', require(path.join(routesPath, '/history')));
    // 5. roster routing
    app.use('/roster', require(path.join(routesPath, '/roster')));
    // 6. hall-of-fame routing
    app.use('/halloffame', require(path.join(routesPath, '/halloffame')));
    // 7. admin routing
    // app.use('/admin', require(path.join(routesPath, '/admin')));
	// --------------------------------------------------
    // to do clanwar subpage routing
	// to do cup subpage
	// to do ladder subpage
    // --------------------------------------------------
    // 8. create necessary environment - before admin subpage existed
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