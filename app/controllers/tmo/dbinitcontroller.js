'use strict'

var mongoose = require('mongoose');
var Role = mongoose.model('Role');
var User = mongoose.model('User');
var NewsCategory = mongoose.model('NewsCategory');
var Team = mongoose.model('Team');
var Counter = mongoose.model('Counter');

var defUserPicture = '/static/images/tmoolympus/const_elements/tmocomments-defaultuserphoto2.png';

module.exports.init = function (dbinitConfig) {
    console.log('Initalizing db..');

    console.log('Checking roles..');
    Counter.generateNextSequence('roleid', function (err, result) {
        if (err) throw err;
        
        Role.update({
            rolename: dbinitConfig.roles[0].name
        }, {
            $set: {
                roleid: result.seq
                , rolename: dbinitConfig.roles[0].name
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
                Counter.generateNextSequence('userid', function (err, result) {
                    if (err) throw err;
                    
                    User.update({
                        taglowercase: dbinitConfig.adminAccount.tag.toLowerCase()
                    }, {
                        $set: {
                            userid: result.seq
                            , tag: dbinitConfig.adminAccount.tag
                            , taglowercase: dbinitConfig.adminAccount.tag.toLowerCase()
                            , email: dbinitConfig.adminAccount.mail
                            , pw: User.generateHash(dbinitConfig.adminAccount.pw)
                            , userPictureSrc: defUserPicture
                        }
                        , $addToSet: {
                            _roleid: role._id
                        }
                    }, {
                        upsert: true
                    }, function (err, raw) {
                        if (err) throw err;

                        User.findOne({
                            taglowercase: dbinitConfig.adminAccount.tag.toLowerCase()
                        }).select('_id').exec(function (err, adminUser) {
                            if (err) throw err;

                            if (adminUser) {
                                console.log('Checking tmo team..');
                                Counter.generateNextSequence('teamid', function (err, result) {
                                    if (err) throw err;
                                    
                                    Team.update({
                                        teamname: dbinitConfig.tmoteam.name
                                    }, {
                                        $set: {
                                            teamid: result.seq
                                            , teamname: dbinitConfig.tmoteam.name
                                            , teamnameshort: dbinitConfig.tmoteam.shortName
                                            , logosrc: dbinitConfig.tmoteam.clanLogoSrc
                                            , createdby: adminUser._id
                                        }
                                        , $addToSet: {
                                            members: adminUser._id
                                        }
                                    }, {
                                        upsert: true
                                    }).exec();
                                });
                            } else {
                                console.log('Couldn\'t find adminuser to create team with his credentials!!');
                            }
                        });
                    });
                });
            });
        });
    });

    Counter.generateNextSequence('roleid', function (err, result) {
        if (err) throw err;
        
        Role.update({
            rolename: dbinitConfig.roles[1].name
        }, {
            $set: {
                roleid: result.seq
                , rolename: dbinitConfig.roles[1].name
                , color: dbinitConfig.roles[1].color
            }
        }, {
            upsert: true
        }).exec();
    });

    Counter.generateNextSequence('roleid', function (err, result) {
        if (err) throw err;
        
        Role.update({
            rolename: dbinitConfig.roles[2].name
        }, {
            $set: {
                roleid: result.seq
                , rolename: dbinitConfig.roles[2].name
                , color: dbinitConfig.roles[2].color
            }
        }, {
            upsert: true
        }).exec();
    });

    Counter.generateNextSequence('roleid', function (err, result) {
        if (err) throw err;
        
        Role.update({
            rolename: dbinitConfig.roles[3].name
        }, {
            $set: {
                roleid: result.seq
                , rolename: dbinitConfig.roles[3].name
                , color: dbinitConfig.roles[3].color
            }
        }, {
            upsert: true
        }).exec();
    });

    console.log('Checking news category..');
    Counter.generateNextSequence('newscategoryid', function (err, result) {
        if (err) throw err;
        
        NewsCategory.update({
            categoryname: dbinitConfig.defaultNewsCategory.catName
        }, {
            $set: {
                categoryid: result.seq
                , categoryname: dbinitConfig.defaultNewsCategory.catName
                , picturesrc: dbinitConfig.defaultNewsCategory.pictureSrc
            }
        }, {
            upsert: true
        }).exec();
    });

    console.log('Fnished initalizing db..');
};