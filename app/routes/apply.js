'use strict'

var path = require('path');
var passport = require('passport');
var apply = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var applyController = require(path.join(__dirname, '../controllers/tmo/apply'));

// renders apply.ejs
apply.get('/', isLoggedIn, applyController.getApply);

module.exports = apply;