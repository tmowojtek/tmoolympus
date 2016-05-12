'use strict'

var create = require('express').Router();
var createController = require('../controllers/tmo/create');

create.get('/newscategory', createController.createNewsCategory);
create.get('/role', createController.createRole);
create.get('/user', createController.createUser);
create.get('/comment', createController.createComment);
create.get('/news', createController.createNews);

module.exports = create;