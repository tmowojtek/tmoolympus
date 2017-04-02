'use strict'

var path = require('path');
var isLoggedInX = require(path.join(__dirname, 'helpers/isLoggedInX'));
var isAuthorized = require(path.join(__dirname, 'helpers/isAuthorized'));
var league = require('express').Router();
var leagueController = require(path.join(__dirname, '../controllers/tmo/league'));

// renders apply.ejs
league.get('/', leagueController.returnIndexPage);

league.get('/schedule', isLoggedInX, isAuthorized.tmoLSA, leagueController.returnAdminSchedulePage);

module.exports = league;