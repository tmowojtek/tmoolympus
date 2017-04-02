'use strict'

var path = require('path');
var passport = require('passport');
var trophyRoom = require('express').Router();
var isLoggedIn = require(path.join(__dirname, 'helpers/isloggedin'));
var trophyRoomController = require(path.join(__dirname, '../controllers/tmo/trophyRoom'));

// renders roster.ejs
trophyRoom.get('/', isLoggedIn, trophyRoomController.gettrophyroom);

module.exports = trophyRoom;