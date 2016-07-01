'use strict'

var isloggedin = require('./helpers/isoggedin');
var settings = require('express').Router();
var settingsController = require('../controllers/tmo/settings');

settings.get('/', isloggedin, settingsController.settings);

module.exports = settings;