'use strict'

var mongoose = require('mongoose');
var Role = mongoose.model('Role');
var User = mongoose.model('User');
var NewsCategory = mongoose.model('NewsCategory');
var Team = mongoose.model('Team');

module.exports.init = function (dbinitConfig) {
    console.log('Initalizing db..');

    console.log('Checking roles..');

    Role.update({
        rolename: dbinitConfig.roles[0].name
    }, {
        $set: {
            rolename: dbinitConfig.roles[0].name
            , color: dbinitConfig.roles[0].color
        }
    }, {
        upsert: true
    }, function (err, raw) {
        if (err) throw err;

        console.log('Checking admin user');
        Role.findOne({
            rolename: 'superadmin'
        }, {
            rolename: 0
            , color: 0
        }, function (err, role) {
            User.update({
                tag: dbinitConfig.adminAccount.tag
            }, {
                $set: {
                    tag: dbinitConfig.adminAccount.tag
                    , taglowercase: dbinitConfig.adminAccount.tag.toLowerCase()
                    , email: dbinitConfig.adminAccount.mail
                    , pw: User.generateHash(dbinitConfig.adminAccount.pw)
                }
                , $addToSet: {
                    _roleid: role._id
                }
            }, {
                upsert: true
            }, function (err, raw) {
                if (err) throw err;
            });
        });
    });

    Role.update({
        rolename: dbinitConfig.roles[1].name
    }, {
        $set: {
            rolename: dbinitConfig.roles[1].name
            , color: dbinitConfig.roles[1].color
        }
    }, {
        upsert: true
    }).exec();

    Role.update({
        rolename: dbinitConfig.roles[2].name
    }, {
        $set: {
            rolename: dbinitConfig.roles[2].name
            , color: dbinitConfig.roles[2].color
        }
    }, {
        upsert: true
    }).exec();

    Role.update({
        rolename: dbinitConfig.roles[3].name
    }, {
        $set: {
            rolename: dbinitConfig.roles[3].name
            , color: dbinitConfig.roles[3].color
        }
    }, {
        upsert: true
    }).exec();

    console.log('Fnished initalizing db..');
};