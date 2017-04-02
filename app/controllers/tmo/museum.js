'use strict'

var mongoose = require('mongoose');

module.exports.getmuseum = function (req, res) {
    res.render('tmo/museum');
}