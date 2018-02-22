'use strict'

var mongoose = require('mongoose');
//var deepPopulate = require('mongoose-deep-populate')(mongoose);
var autoPopulate = require('mongoose-autopopulate');

module.exports.init = function (app) {
    var config = app.get('config');

    //mongoose.connect(config.mongodb.uri); // local
    //mongoose.connect(config.mongodb.uri, config.mongodb.options); // not used?
    //openshift srv
    mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + config.mongodb.options.dbname);

    // global plugin registration
    //mongoose.plugin(deepPopulate, {});
    mongoose.plugin(autoPopulate);

    // If the Node process ends, cleanup existing connections
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGHUP', cleanup);

    if (app) {
        app.set('mongoose', mongoose);
    }

    return mongoose;
};

function cleanup() {
    mongoose.connection.close(function () {
        console.log('function cleanup was called to remove existing mongodb connections!');
        process.exit(0);
    });
}