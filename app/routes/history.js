'use strict'

var passport = require('passport');
var history = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var historyController = require('../controllers/tmo/history');

// renders apply.ejs
history.get('/', isLoggedIn, historyController.getHistory);

module.exports = history;