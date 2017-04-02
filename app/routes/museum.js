'use strict'

var path = require('path');
var passport = require('passport');
var museum = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var museumController = require(path.join(__dirname, '../controllers/tmo/museum'));

// renders roster.ejs
museum.get('/', isLoggedIn, museumController.getmuseum);

module.exports = museum;