'use strict'

var create = require('express').Router();
var createController = require('../controllers/tmo/create');
var isloggedin = require('./helpers/isloggedin');
var isAuthorized = require('./helpers/isAuthorized');

create.get('/newscategory', isloggedin, isAuthorized.tmoSA, createController.createNewsCategory);
create.get('/role', isloggedin, isAuthorized.tmoSA, createController.createRole);
create.get('/user', isloggedin, isAuthorized.tmoSA, createController.createUser);
create.get('/comment', isloggedin, isAuthorized.tmoSA, createController.createComment);
create.get('/news', isloggedin, isAuthorized.tmoSA, createController.createNews);

module.exports = create;