'use strict'

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');
var Counter = require('mongoose').model('Counter');
var Role = require('mongoose').model('Role');

module.exports = function() {
	passport.use('local-signup', new LocalStrategy({
			usernameField: 'registertag',
			passwordField: 'registerpw',
			passReqToCallback: true
		},
		function(req, tag, pw, done) {
			var email = req.body.registeremail.toLowerCase();
			if ( !email || (email.trim() ==='') || ((email.match(/@/g) || []).length != 1) )
				return done(null, false, req.flash('signupMessage', 'Unknown or incorrect email'));
			if ( !tag || (tag.trim() ==='') || (tag.length < 3) )
				return done(null, false, req.flash('signupMessage', 'Invalid username - length(<3) or empty username'));
			if ( !pw || (pw.trim() ==='') || (pw.length < 3) )
				return done(null, false, req.flash('signupMessage', 'Invalid password - length(<3) or empty password'));
			var taglowercase = tag.toLowerCase();
			console.log(email); // !!!!!!!!!!!!!!!
			User.find(
				{ $or: [{ taglowercase: taglowercase }, { email: email } ]},
				function(err, users) {
					//console.log(tag + ' ' + taglowercase + ' ' + pw + ' ' + req.body.registerrepw); // !!!!!!!!!!!!!!!
					console.log(users);
					if(err) return done(err);
					if (pw !== req.body.registerrepw)
						return done(null, false, req.flash('signupMessage', 're-pw doesn\'t match pw'));
					if(users.length) {
						console.log('nie ma nic a jestem tutaj?');
						users.forEach(function(user) {
							if(user.taglowercase === taglowercase)
								return done(null, false, req.flash('signupMessage', 'This tag is already in use'));
							else if (user.email === email)
								return done(null, false, req.flash('signupMessage', 'This email is already in use'));
						});
					} else {
						console.log('jestem tutaj');
						
                        var newUser = new User({ tag: tag,
                                                taglowercase: taglowercase,
                                                /*pw: pw,*/
                                                pw: User.generateHash(pw),
                                                email: email
                                               });
                        
                        //console.log('newuser po konstruktorze: ' + newUser);
						
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            
                            console.log('zapisany user: ' + newUser);
                            
                            return done(null, newUser);
                        });

                        /*
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
						*/
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