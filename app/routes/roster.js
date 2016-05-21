'use strict'

var passport = require('passport');
var roster = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var rosterController = require('../controllers/tmo/roster');

// renders roster.ejs
roster.get('/', isLoggedIn, rosterController.getRoster);

module.exports = roster;