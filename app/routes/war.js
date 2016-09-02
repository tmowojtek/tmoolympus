'use strict'

var passport = require('passport');
var war = require('express').Router();
var isLoggedIn = require('./helpers/isloggedin');
var isAuthorized = require('./helpers/isAuthorized');
var warsController = require('../controllers/tmo/wars');

war.get('/:warid([0-9]+)', isLoggedIn, warsController.getWarById);
war.post('/:warid([0-9]+)/addcomment', isLoggedIn, warsController.addComment);
war.delete('/delete/:warid([0-9]+)', isLoggedIn, isAuthorized.tmoMLSA, warsController.deleteWarById);

module.exports = war;