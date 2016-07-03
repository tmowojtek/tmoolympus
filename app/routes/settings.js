'use strict'

var isloggedin = require('./helpers/isloggedin');
var settings = require('express').Router();
var settingsController = require('../controllers/tmo/settings');

settings.get('/', isloggedin, settingsController.getSettings);

module.exports = settings;