'use strict'

var mongoose = require('mongoose');

module.exports.getRoster = function (req, res) {
    res.render('tmo/roster');
};