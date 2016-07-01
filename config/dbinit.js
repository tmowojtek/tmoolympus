'use strict'

var dbinitController = require('../app/controllers/tmo/dbinitcontroller');

module.exports.init = function(app) {
    var config = app.get('config');
    
    dbinitController.init(config.dbinitValues);
};