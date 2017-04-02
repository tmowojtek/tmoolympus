#!/bin/env node

/**
 * Set node environment from config
 */
process.env.NODE_ENV = 'production';
//process.env.NODE_ENV = config.nodeEnv;
console.log(process.env.NODE_ENV);

var http = require('http');
//const https = require('https');
//const fs = require('fs');
var path = require('path');
var express = require('express');  
var config = require(path.join(__dirname, 'config/config'));
var app = express();
var server;

// reading key and certificate for ssl
/*
const options = {
    key: fs.readFileSync(path.join(__dirname, '../config/utils/key.pem'))
    , cert: fs.readFileSync(path.join(__dirname, '../config/utils/cert.pem'))
    , passphrase: 'testowanie'
}
*/

/**
 *   app version
 */
//app.version = '0.1';

/**
 *Set express (app) variables
 */
app.set('config', config);
app.set('root', __dirname);

require(path.join(__dirname, 'config/morgan')).init(app);
require(path.join(__dirname, 'config/dirinit')).init(app);
require(path.join(__dirname, 'config/mongoose')).init(app);
require(path.join(__dirname, 'config/models')).init(app);
require(path.join(__dirname, 'config/passport')).init(app);
require(path.join(__dirname, 'config/express')).init(app); // contains connect-mongose for session-storage
require(path.join(__dirname, 'config/routes')).init(app); // zainicjalizowane w express przez static /public - test na unwilled req.
require(path.join(__dirname, 'config/dbinit')).init(app); // inicjalowanie bazy danych z niezbednymi wartosciami, potrzebnymi do uruchomienia strony

/**
 * Start the app if not loaded by another module
 **/
if (!module.parent) {
    server = http.createServer(app);
    //server = https.createServer(options, app);
    //server.listen(config.port || 3000, function () {
    server.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || config.hostname, function () {
        var addr = server.address();
        console.log(
            '%s is running, listening on %s:%s'
            , config.app.name
            , addr.address
            , addr.port
        );
    });
}

module.exports = app;