'use strict'

module.exports = function(req, res, next) {
	console.log('req.path: ' + req.path);
	if (req.path === '/auth')
		if (req.isAuthenticated())
			res.redirect('/');
		else 
			return next();
	else if (req.isAuthenticated()) {
		console.log('he is authenticated and path that called: ' + req.path);
		//if (req.path === '/auth') // if logged disable signup / login page
			//return res.redirect('/');
		//else
			return next();
	} else {
		//if (req.method == 'GET') req.session.returnTo = req.originalUrl;
		// if not logged in redirect to login/register path
		console.log('user isnt authenticated');
		res.redirect('/auth');
	}
};