'use strict'

var passport = require('passport');
var news = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var newsController = require('../controllers/tmo/news');

// main news page
news.get('/', isLoggedIn, newsController.getLatestNewsAndWars);
// lists news per user with role
news.get('/news', isLoggedIn, newsController.getAllNews);
// get one particular news with comments
news.get('/news/:newsid([0-9]+)', isLoggedIn, newsController.getNewsById);
// get one particular news with comments -> after submitting form
news.post('/news/:newsid([0-9]+)', isLoggedIn, newsController.getNewsById);
// get page with NEXT or PREV news - pagination
news.get('/news/page/:pageid([0-9]+)', isLoggedIn, newsController.getPage);
// post comment news
news.post('/news/:newsid([0-9]+)/addcomment', isLoggedIn, newsController.addComment);

/*
news.get('/', isLoggedIn, function(req, res) {
	console.log('im about to render news page');
	// get and render news
	res.render('tmo/index.ejs');
});
*/

// login and register page
/*
tmo.get('/auth', isLoggedIn, function(req, res) {
	console.log('im about to render auth page');
	res.render('tmo/authenticate.ejs', { signinMessage: req.flash('signinMessage'),
									signupMessage: req.flash('signupMessage')});
});

tmo.post('/auth/signin', passport.authenticate('local-signin', {
		successRedirect: '/',
		failureRedirect: '/auth',
		failureFlash: true
}));

tmo.post('/auth/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/auth',
		failureFlash: true
}));
*/
module.exports = news;