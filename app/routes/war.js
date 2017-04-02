'use strict'

var path = require('path');
var passport = require('passport');
var war = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var isAuthorized = require(path.join(__dirname, 'helpers/isAuthorized'));
var warsController = require(path.join(__dirname, '../controllers/tmo/wars'));

war.get('/:warid([0-9]+)', isLoggedIn, warsController.getWarById);
war.post('/:warid([0-9]+)/addcomment', isLoggedIn, warsController.addComment);
war.delete('/delete/:warid([0-9]+)', isLoggedIn, isAuthorized.tmoMLSA, warsController.deleteWarById);

module.exports = war;