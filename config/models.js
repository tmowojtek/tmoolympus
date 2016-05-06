'use strict'

var path = require('path');

module.exports.init = function(app) {
	var modelsPath = path.join(app.get('root'), '../app/models/');
	
	['counter', 'user', 'comment', 'news'].forEach(function(model) {
		require(path.join(modelsPath, model));
	});
};