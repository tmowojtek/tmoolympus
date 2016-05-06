'use strict'

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
	passport.use('local-signin', new LocalStrategy({
			usernameField: 'tag',
			passwordField: 'pw',
			passReqToCallback: true
		},
		function(req, tag, pw, done) {
			User.findOne({ 'tag': tag }, function(err, user) {
				if(err) 
					return done(err);
				if(!user) 
					return done(null, false, req.flash('signinMessage', 'No user found'));
				if(!user.validatePassword(pw)) 
					return done(null, false, req.flash('signinMessage', 'Oops! Wrong password'));
				else
					return done(null, user);
			});
		}
	));
};