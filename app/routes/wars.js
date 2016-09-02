'use strict'

var passport = require('passport');
var wars = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var warsController = require('../controllers/tmo/wars');

// renders wars list
wars.get('/', isLoggedIn, warsController.getWarsList);
// returns next batch of wars
wars.get('/:nextBatch([0-9]+)', isLoggedIn, warsController.getNextWarsBatch);

module.exports = wars;