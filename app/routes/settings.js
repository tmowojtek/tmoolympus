'use strict'

var isloggedin = require('./helpers/isloggedin');
var settings = require('express').Router();
var settingsController = require('../controllers/tmo/settings');

settings.get('/', isloggedin, settingsController.getSettings);
settings.get('/user/activepic', isloggedin, settingsController.getUserActivePic);
settings.get('/user/resetpic', isloggedin, settingsController.resetUserPic);
settings.post('/user/updatepic', isloggedin, settingsController.userUpdatePic);
settings.get('/news/getnewscategories', isloggedin, settingsController.getNewsCategories);
settings.get('/news/getroles', isloggedin, settingsController.getRoles);

module.exports = settings;