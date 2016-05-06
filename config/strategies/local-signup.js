'use strict'

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');
var Counter = require('mongoose').model('Counter');

module.exports = function() {
	passport.use('local-signup', new LocalStrategy({
			usernameField: 'registertag',
			passwordField: 'registerpw',
			passReqToCallback: true
		},
		function(req, tag, pw, done) {
			var email = req.body.registeremail.toLowerCase();
			if ( !email || (email.trim() ==='') )
				return done(null, false, req.flash('signupMessage', 'Unknown email'));
			var tagLowercase = tag.toLowerCase();
			console.log(email); // !!!!!!!!!!!!!!!
			User.find(
				{ $or: [{ tagLowercase: tagLowercase }, { email: email } ]},
				function(err, users) {
					console.log(tag + ' ' + tagLowercase + ' ' + pw + ' ' + req.body.registerrepw); // !!!!!!!!!!!!!!!
					console.log(users);
					if(err) return done(err);
					if (pw !== req.body.registerrepw)
						return done(null, false, req.flash('signupMessage', 're-pw doesn\'t match pw'));
					if(users.length) {
						console.log('nie ma nic a jestem tutaj?');
						users.forEach(function(user) {
							if(user.tagLowercase === tagLowercase)
								return done(null, false, req.flash('signupMessage', 'This tag is already in use'));
							else if (user.email === email)
								return done(null, false, req.flash('signupMessage', 'This email is already in use'));
						});
					} else {
						console.log('jestem tutaj');
						var newUser = new User();
						
						Counter.generateNextSequence('userid', function(err, result) {
							console.log('userSIGNUP: ' + newUser);
							if (err) throw err;
							console.log('result signup: ' + result);
							newUser.userid = result.seq;
							console.log('userSIGNUP2: ' + newUser);
							
							newUser.tag = tag;
							newUser.tagLowercase = tagLowercase;
							newUser.pw = newUser.generateHash(pw);
							newUser.email = email;
							console.log('przed save');
							newUser.save(function(err) {
								if (err)
									throw err;
								return done(null, newUser);
							});
						});
						
						/*
						newUser.tag = tag;
						newUser.tagLowercase = tagLowercase;
						newUser.pw = newUser.generateHash(pw);
						newUser.email = email;
						console.log('przed save');
						//newUser.userid = 1;
						newUser.getNextUserIdSequence();
						newUser.save(function(err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
						*/
					}
				}
			);
		}
	));
};