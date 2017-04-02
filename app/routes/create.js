'use strict'

var path = require('path');
var create = require('express').Router();
var createController = require(path.join(__dirname, '../controllers/tmo/create'));
var isloggedin = require(path.join(__dirname, 'helpers/isloggedin'));
var isAuthorized = require(path.join(__dirname, 'helpers/isAuthorized'));

create.get('/newscategory', isloggedin, isAuthorized.tmoSA, createController.createNewsCategory);
create.get('/role', isloggedin, isAuthorized.tmoSA, createController.createRole);
create.get('/user', isloggedin, isAuthorized.tmoSA, createController.createUser);
create.get('/comment', isloggedin, isAuthorized.tmoSA, createController.createComment);
create.get('/news', isloggedin, isAuthorized.tmoSA, createController.createNews);

module.exports = create;