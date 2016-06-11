'use strict'; // test

var config = {
    nodeEnv: 'production'
    , cache: {
        maxAge: 864000000
    }
    , port: 3000
    , hostname: "127.0.0.1"
    , baseUrl: 'http://localhost:3000'
    , mongodb: {
        uri: "mongodb://localhost/tmoolympus"
        , options: {
            user: "admin"
            , pass: "fQtmqPwT8YZx"
        }
    }
    , app: {
        name: "tmoolympus"
    }
    , serveStatic: true
    , session: {
        secret: 'tr0l0l0l0'
        , saveUninitialized: false
        , cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14 // 14 days
        }
        , mongodbCollection: 'user-session'
        , touchAfter: 24 * 3600 // 24h
    }
    , proxy: {
        trust: false
    }
    , passportStrategy: {
        local: true
    }
    , favicon: 'ikona.ico'
};

module.exports = config;