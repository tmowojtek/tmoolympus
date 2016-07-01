'use strict'

var logout = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var logoutController = require('../controllers/tmo/logout');

// logout loggedin user and redirect him to / which makes him go to /auth 'cause is not logged in
logout.get('/', isLoggedIn, logoutController.logout);

module.exports = logout;
