'use strict'

var path = require('path');
var logout = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var logoutController = require(path.join(__dirname, '../controllers/tmo/logout'));

// logout loggedin user and redirect him to / which makes him go to /auth 'cause is not logged in
logout.get('/', isLoggedIn, logoutController.logout);

module.exports = logout;
