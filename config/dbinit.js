'use strict'

var path = require('path');
//var dbinitController = require(path.join(app.get('root'), 'app/controllers/tmo/dbinitcontroller'));

module.exports.init = function(app) {
	var dbinitController = require(path.join(app.get('root'), 'app/controllers/tmo/dbinitcontroller'));
    var config = app.get('config');
    
    dbinitController.init(config.dbinitValues);
};