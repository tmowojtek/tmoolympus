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
settings.post('/news/uploadnews', isloggedin, settingsController.uploadNews);
settings.get('/war/gettmoclans', isloggedin, settingsController.getTmoClans);
settings.get('/war/gettmomembers', isloggedin, settingsController.getTmoMembers);
settings.get('/war/getuserslist', isloggedin, settingsController.getUsersList);
settings.post('/war/uploadwar', isloggedin, settingsController.uploadWar);

module.exports = settings;