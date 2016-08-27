'use strict'

var mongoose = require('mongoose');

module.exports.getWarsList = function (req, res) {
    res.render('tmo/war-list');
}

module.exports.getWarById = function(req, res) {
    res.render('tmo/war-id');
}