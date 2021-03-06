'use strict'

var path = require('path');
var passport = require('passport');
var auth = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var authController = require(path.join(__dirname, '../controllers/tmo/authenticate'));

auth.get('/auth', isLoggedIn, function(req, res) {
	console.log('im about to render auth page');
	res.render('tmo/authenticate.ejs', { signinMessage: req.flash('signinMessage'),
									signupMessage: req.flash('signupMessage')});
});

auth.post('/auth/signin', passport.authenticate('local-signin', {
		successRedirect: '/',
		failureRedirect: '/auth',
		failureFlash: true
}));

auth.post('/auth/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/auth',
		failureFlash: true
}));

module.exports = auth;