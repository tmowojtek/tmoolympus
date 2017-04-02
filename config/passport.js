'use strict'

var path = require('path');
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
	require(path.join(__dirname, 'strategies/local-signup'))();
	require(path.join(__dirname, 'strategies/local-signin'))();
};