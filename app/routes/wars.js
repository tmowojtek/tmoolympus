'use strict'

var passport = require('passport');
var wars = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var warsController = require('../controllers/tmo/wars');

// renders wars list
wars.get('/', isLoggedIn, warsController.getWarsList);
// renders war with specific id
wars.get('/:warid([0-9]+)', isLoggedIn, warsController.getWarById);

module.exports = wars;