'use strict'

var passport = require('passport');
var halloffame = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var halloffameController = require('../controllers/tmo/halloffame');

// renders roster.ejs
halloffame.get('/', isLoggedIn, halloffameController.gethalloffame);

module.exports = halloffame;