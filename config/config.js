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
            , pass: "deffo_not_working_hehe"
			, dbname: "tmoolympus"
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
    , dbinitValues: {
        adminAccount: {
            tag: 'kiki'
            , pw: '$2a$08$NFkAz5HGaK3/TV.wphu2JuWBwBKB6yMI4DsVvRXFf9DTyTFdYMOau'
            , mail: 'tmowojtek@gmail.com'
        }
        , roles: [{
            name: 'superadmin'
            , color: '#ca2c76' //pink
        }, {
            name: 'tmo leadership'
            , color: '#33b0dd' // blue
        }, {
            name: 'tmo member'
            , color: '#ffc90e' // yellow
        }, {
            name: 'site user'
            , color: '#bdb76b' // default khaki?
        }]
        , defaultNewsCategory: {
            catName: 'TMO News'
            , pictureSrc: '/static/images/tmoolympus/const_elements/tmonewscategoryimage-star.png'
        }
        , tmoteam: {
            name: 'The Myth of'
            , shortName: 'tmo'
            , clanLogoSrc: '/static/images/tmoolympus/const_elements/tmolastwars-tmoclanlogo.png'
            , createdByTag: 'kiki'
        }
    }
};

module.exports = config;