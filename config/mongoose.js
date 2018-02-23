'use strict'

var mongoose = require('mongoose');
//var deepPopulate = require('mongoose-deep-populate')(mongoose);
var autoPopulate = require('mongoose-autopopulate');

module.exports.init = function (app) {
    var config = app.get('config');

    //mongoose.connect(config.mongodb.uri); // local
    //mongoose.connect(config.mongodb.uri, config.mongodb.options); // not used?
    //openshift srv
    //mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + config.mongodb.options.dbname);
	//mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL);
	
	// default to a 'localhost' configuration:
	//var connection_string = '127.0.0.1:27017/tmoolympus';
	// if OPENSHIFT env variables are present, use the available connection info:
	/*if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
		connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
		process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
		process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
		process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
		process.env.OPENSHIFT_APP_NAME;
	}
	mongoose.connect(connection_string);*/
	
	var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
      mongoUser = process.env[mongoServiceName + '_USER'];
	var mongoURL = 'mongodb://';
	mongoURL += mongoUser + ':' + mongoPassword + '@';
	mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
	console.log(mongoURL);
	console.log("trying to connect..");
	mongoose.connect(mongoURL, { autoIndex: false }, function(err) { 
		console.log("inside error callback");
		if (err) throw err;
	});
	console.log("after connect..");

    // global plugin registration
    //mongoose.plugin(deepPopulate, {});
    mongoose.plugin(autoPopulate);

    // If the Node process ends, cleanup existing connections
    //process.on('SIGINT', cleanup);
    //process.on('SIGTERM', cleanup);
    //process.on('SIGHUP', cleanup);

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