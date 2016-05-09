'use strict'

var path = require('path');

module.exports.init = function (app) {
    var modelsPath = path.join(app.get('root'), '../app/models/');

	['counter', 'role', 'user', 'comment', 'news', 'team', 'warresult'].forEach(function (model) {
        require(path.join(modelsPath, model));
    });
};