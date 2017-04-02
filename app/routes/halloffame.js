'use strict'

var path = require('path');
var passport = require('passport');
var halloffame = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var halloffameController = require(path.join(__dirname, '../controllers/tmo/halloffame'));

// renders roster.ejs
halloffame.get('/', isLoggedIn, halloffameController.gethalloffame);

module.exports = halloffame;