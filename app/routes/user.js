'use strict'

var user = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var userController = require('../controllers/tmo/user');

// logout loggedin user and redirect him to / which makes him go to /auth 'cause is not logged in
user.get('/:id', isLoggedIn, userController.getUserById);

module.exports = user;