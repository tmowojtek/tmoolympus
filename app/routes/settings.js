'use strict'

var path = require('path');
var settings = require('express').Router();
var isloggedin = require(path.join(__dirname, 'helpers/isloggedin'));
var isAuthorized = require(path.join(__dirname, 'helpers/isAuthorized'));
var settingsController = require(path.join(__dirname, '../controllers/tmo/settings'));

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
settings.get('/admin/getteamnames', isloggedin, isAuthorized.tmoLSA, settingsController.getTeamNames);
settings.post('/admin/uploadteam', isloggedin, isAuthorized.tmoLSA, settingsController.uploadTeam);
settings.delete('/admin/removeteam/:teamname', isloggedin, isAuthorized.tmoLSA, settingsController.removeTeam);

module.exports = settings;