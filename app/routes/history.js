'use strict'

var path = require('path');
var passport = require('passport');
var history = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var historyController = require(path.join(__dirname, '../controllers/tmo/history'));

// renders apply.ejs
history.get('/', isLoggedIn, historyController.getHistory);

module.exports = history;