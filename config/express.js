
var path = require('path');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var serveStatic = require('serve-static');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo/es5')(session); // session
var flash = require('connect-flash');
var ejs = require('ejs');
//var versionator = require('versionator');

module.exports.init = function (app) {
    var root = app.get('root');
    var config = app.get('config');
    var mongoose = app.get('mongoose');

    if (config.proxy.trust) {
        app.enable('trust proxy');
    }

    /**
     * Common express configs
     */
    app.use(compression());
    app.use(favicon(path.join(root, 'public/' + config.favicon)));
    app.use(expressValidator());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    /**
     * Configure view engine
     */
    app.set('views', path.join(root, 'app/views'));
    app.set('view engine', 'ejs');

    /** 
     * Initialize routes & router
     */
    //require('../config/routes').init(app);
    
    /**
    * Versionator - keeping up to date cached files
    */
    //var basic = versionator.createBasic('v' + app.version);
    //app.locals.versionPath = basic.version;
    
    //app.use(basic.middleware);

    if (config.serveStatic) {
        app.use('/static', serveStatic(path.join(root, 'public'), {
            /*maxAge: config.cache.maxAge*/
        }));
    }

    /**
     * Express session managment
     */
    app.use(session({
        secret: config.session.secret
        , resave: false
        , saveUninitialized: config.session.saveUninitialized
        , store: new MongoStore({
            mongooseConnection: mongoose.connections[0]
            , collection: config.session.mongodbCollection
            , touchAfter: config.session.touchAfter
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    /*
    // change position to different file of everything below
    app.get('/register', function(req, res) {
    	res.sendFile(path.join(root, '../public/index.html'));
    });
	
    app.post('/register', passport.authenticate('local-signup', {
    	successRedirect: '/register',
    	failureRedirect: '/',
    	failureFlash: true
    }));
	
    app.post('/login', passport.authenticate('local-signin', {
    	successRedirect: '/lobby',
    	failureRedirect: '/',
    	failureFlash: true
    }));
	
    app.get('/', function(req, res) {
    	res.sendFile(path.join(root, '../public/index2.html'));
    });
	
    app.get('/lobby', isLoggedIn, function(req, res) {
    	console.log("Sent lobby.html file to client");
    	res.sendFile(path.join(root, '../public/lobby.html'));
    });
    */
};
// change place of this function(different file)
/*
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	//if (req.method == 'GET') req.session.returnTo = req.originalUrl;
	console.log('user isnt authenticated');
	res.redirect('/');
};
*/