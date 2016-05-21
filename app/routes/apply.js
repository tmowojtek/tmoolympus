'use strict'

var passport = require('passport');
var apply = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var applyController = require('../controllers/tmo/apply');

// renders apply.ejs
apply.get('/', isLoggedIn, applyController.getApply);

module.exports = apply;