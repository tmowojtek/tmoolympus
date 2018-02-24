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

    Counter.generateNextSequence('roleid', function (err, result3) {
        if (err) throw err;

        Role.update({
            rolename: dbinitConfig.roles[2].name
        }, {
            $setOnInsert: {
                roleid: result3.seq
                , rolename: dbinitConfig.roles[2].name
                , color: dbinitConfig.roles[2].color
            }
        }, {
            upsert: true
        }, function (err, raw) {
            if (err) throw err;
            Counter.generateNextSequence('roleid', function (err, result2) {
                if (err) throw err;

                Role.update({
                    rolename: dbinitConfig.roles[3].name
                }, {
                    $setOnInsert: {
                        roleid: result2.seq
                        , rolename: dbinitConfig.roles[3].name
                        , color: dbinitConfig.roles[3].color
                    }
                }, {
                    upsert: true
                }, function (err, raw) {
                    if (err) throw err;

                    Counter.generateNextSequence('roleid', function (err, result) {
                        if (err) throw err;

                        Role.update({
                            rolename: dbinitConfig.roles[0].name
                        }, {
                            $setOnInsert: {
                                roleid: result.seq
                                , rolename: dbinitConfig.roles[0].name
                                , color: dbinitConfig.roles[0].color
                            }
                        }, {
                            upsert: true
                        }, function (err, raw) {
                            if (err) throw err;

                            console.log('Checking admin user');
                            Role.find({
                                rolename: {
                                    $in: ['superadmin', 'site user', 'tmo member']
                                }
                            }, {
                                rolename: 0
                                , color: 0
                            }, function (err, role) {
                                Counter.generateNextSequence('userid', function (err, result) {
                                    if (err) throw err;

                                    console.log(role);
                                    if (role.length != 3) throw null;

                                    User.update({
                                        taglowercase: dbinitConfig.adminAccount.tag.toLowerCase()
                                    }, {
                                        $setOnInsert: {
                                            userid: result.seq
                                            , tag: dbinitConfig.adminAccount.tag
                                            , taglowercase: dbinitConfig.adminAccount.tag.toLowerCase()
                                            , email: dbinitConfig.adminAccount.mail
                                            , pw: dbinitConfig.adminAccount.pw
                                            , userPictureSrc: defUserPicture
                                            , createdat: Date.now()
                                            , active: true
                                        }
                                        , $addToSet: {
                                            _roleid: {
                                                $each: [role[0]._id, role[1]._id]
                                            }
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
                                                        $setOnInsert: {
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
                });
            });
        });
    });
    //tmo leadership
    Counter.generateNextSequence('roleid', function (err, result) {
        if (err) throw err;

        Role.update({
            rolename: dbinitConfig.roles[1].name
        }, {
            $setOnInsert: {
                roleid: result.seq
                , rolename: dbinitConfig.roles[1].name
                , color: dbinitConfig.roles[1].color
            }
        }, {
            upsert: true
        }).exec();
    });
    //tmo member
    /*
    Counter.generateNextSequence('roleid', function (err, result) {
        if (err) throw err;

        Role.update({
            rolename: dbinitConfig.roles[2].name
        }, {
            $setOnInsert: {
                roleid: result.seq
                , rolename: dbinitConfig.roles[2].name
                , color: dbinitConfig.roles[2].color
            }
        }, {
            upsert: true
        }).exec();
    });
    */
    /*
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
    */

    console.log('Checking news category..');
    Counter.generateNextSequence('newscategoryid', function (err, result) {
        if (err) throw err;

        NewsCategory.update({
            categoryname: dbinitConfig.defaultNewsCategory.catName
        }, {
            $setOnInsert: {
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