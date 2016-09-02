'use strict'

var isloggedin = require('./helpers/isloggedin');
var isAuthorized = require('./helpers/isAuthorized');
var settings = require('express').Router();
var settingsController = require('../controllers/tmo/settings');

settings.get('/', isloggedin, isAuthorized.tmoSiteUser, settingsController.getSettings);
settings.get('/user/activepic', isloggedin, isAuthorized.tmoSiteUser, settingsController.getUserActivePic);
settings.get('/user/resetpic', isloggedin, isAuthorized.tmoSiteUser, settingsController.resetUserPic);
settings.post('/user/updatepic', isloggedin, isAuthorized.tmoSiteUser, settingsController.userUpdatePic);
settings.get('/news/getnewscategories', isloggedin, isAuthorized.tmoLSA, settingsController.getNewsCategories);
settings.get('/news/getroles', isloggedin, isAuthorized.tmoLSA, settingsController.getRoles);
settings.post('/news/uploadnews', isloggedin, isAuthorized.tmoLSA, settingsController.uploadNews);
settings.get('/war/gettmoclans', isloggedin, isAuthorized.tmoMLSA, settingsController.getTmoClans);
settings.get('/war/gettmomembers', isloggedin, isAuthorized.tmoMLSA, settingsController.getTmoMembers);
settings.get('/war/getuserslist', isloggedin, isAuthorized.tmoMLSA, settingsController.getUsersList);
settings.post('/war/uploadwar', isloggedin, isAuthorized.tmoMLSA, settingsController.uploadWar);

module.exports = settings;