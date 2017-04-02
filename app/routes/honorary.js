'use strict'

var path = require('path');
var passport = require('passport');
var honorary = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var honoraryController = require(path.join(__dirname, '../controllers/tmo/honorary'));

// renders roster.ejs
honorary.get('/', isLoggedIn, honoraryController.gethonorary);

module.exports = honorary;