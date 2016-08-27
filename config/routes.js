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
    // 7. settings routing - user panel / admin panel / wars panel / news panel
     app.use('/settings', require(path.join(routesPath, '/settings')));
    // 8. create necessary environment - before admin subpage existed
    app.use('/create', require(path.join(routesPath, '/create')));
    // 9. logout routing
    app.use('/logout', require(path.join(routesPath, '/logout')));
    // 10. wars list / warid routing
    app.use('/wars', require(path.join(routesPath, '/wars')));
    // --------------------------------------------------
    // to do user profile subpage
    app.use('/user', require(path.join(routesPath, '/user')));
    // to do clanwar subpage routing
	// to do cup subpage
	// to do ladder subpage
    // --------------------------------------------------
	
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