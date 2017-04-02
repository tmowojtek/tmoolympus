'use strict'

var path = require('path');
var passport = require('passport');
var roster = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var rosterController = require(path.join(__dirname, '../controllers/tmo/roster'));

// renders roster.ejs
roster.get('/', isLoggedIn, rosterController.getRoster);

module.exports = roster;