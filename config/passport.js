'use strict'

var passport = require('passport');
var User = require('mongoose').model('User');

module.exports.init = function(app) {
	passport.serializeUser(function(user, done)  {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, done);
	});
	
	// load strategies
	require('./strategies/local-signup')();
	require('./strategies/local-signin')();
};