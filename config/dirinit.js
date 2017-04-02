'use strict'

var mkdirp = require('mkdirp');
var path = require('path');

module.exports.init = function (app) {
    var publicFolderPath = path.join(app.get('root'), 'public');

    mkdirp(path.join(publicFolderPath, '/assets'), function (err) {
        if (err) console.error(err);

        else mkdirp(path.join(publicFolderPath, '/assets/newsimg'), function (err) {
            if (err) console.error(err);

            else mkdirp(path.join(publicFolderPath, '/assets/avatars'), function (err) {
                if (err) console.error(err);

                else mkdirp(path.join(publicFolderPath, '/assets/warimg'), function (err) {
                    if (err) console.error(err);

                    else mkdirp(path.join(publicFolderPath, '/assets/tmp'), function (err) {
                        if (err) console.error(err);

                        else mkdirp(path.join(publicFolderPath, '/assets/teamimg'), function (err) {
                            if (err) console.error(err);

                            else console.log('all dirs donee');
                        });
                    });
                });
            });
        });
    });
};