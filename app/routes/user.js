'use strict'

var path = require('path');
var user = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var userController = require(path.join(__dirname, '../controllers/tmo/user'));

// logout loggedin user and redirect him to / which makes him go to /auth 'cause is not logged in
user.get('/:id', isLoggedIn, userController.getUserById);

module.exports = user;