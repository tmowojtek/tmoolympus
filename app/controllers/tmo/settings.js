'use strict'

var fs = require('fs');
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var NewsCategory = mongoose.model('NewsCategory');
var News = mongoose.model('News');
var Team = mongoose.model('Team');
var WarResult = mongoose.model('WarResult');

var defUserPicture = '/static/images/tmoolympus/const_elements/tmocomments-defaultuserphoto2.png';

var defTmoPic = '/static/images/tmoolympus/const_elements/tmolastwars-tmoclanlogo.png';

var defOpponentPic = '/static/images/tmoolympus/const_elements/tmolastwars-nologo_v2.png';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.path == '/news/uploadnews') {
            cb(null, './public/assets/newsimg/')
        } else if (req.path == '/user/updatepic') {
            cb(null, './public/assets/avatars/')
        } else if (req.path == '/war/uploadwar') {
            cb(null, './public/assets/warimg/')
        } else if (req.path == '/admin/uploadteam') {
            cb(null, './public/assets/teamimg/')
        } else {
            cb(null, './public/assets/tmp/')
        }
    }
    , filename: function (req, file, cb) {
        cb(null, req.user._id + '_' + Date.now() + '-' + file.originalname)
    }
});

var mult = multer({
    storage: storage
});
var upload = mult.single('file');
var upload_multi = mult.array('file', 10);

/*var upload = multer({
    storage: storage
}).single('file');*/

/*var upload_multi = multer({
    storage: storage
}).array('file', 10);*/

/*
module.exports.getSettings = function (req, res) {
    res.sendFile(path.join(__dirname, '../../../public/settings.html'));
};
*/

module.exports.getSettings = function (req, res) {
    User.findOne({
        _id: req.user._id
    }).populate('_roleid', '-_id rolename').select('-_id _roleid').exec(function (err, user) {
        if (err) {
            res.send('Settings page cannot be loaded.');
        } else {
            var roles = [];
            //console.log(user);
            if (user._roleid) {
                user._roleid.forEach(function (role) {
                    roles.push(role.rolename);
                });
            }
            res.render('tmo/settings', {
                roles: roles
            });
        }
    });
}

module.exports.userUpdatePic = function (req, res) {
    upload(req, res, function (err) {
        console.log(req.user._id);
        if (err) {
            fs.unlink(req.file.path, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('tudum file deleted rofl');
                }
            });
            console.log('error_multer' + err);
            res.json({
                src: '-1'
            });
        } else {
            var picPath = path.join('/static/assets/avatars/', req.file.filename);

            User.findById(req.user._id, function (err, user) {
                if (err) {
                    fs.unlink(req.file.path, function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('tudum file deleted rofl');
                        }
                    });
                    console.error(err);
                    res.json({
                        src: '-1'
                    });
                } else {
                    var oldPicSrc = user.userPictureSrc;
                    console.log('picOld: ' + oldPicSrc);
                    console.log('picNew: ' + picPath);
                    user.userPictureSrc = picPath;
                    user.save(function (err) {
                        if (err) {
                            fs.unlink(req.file.path, function (err) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log('tudum file deleted rofl');
                                }
                            });
                            console.error(err);
                            res.json({
                                src: '-1'
                            });
                        } else {
                            if (oldPicSrc == defUserPicture) {
                                res.json({
                                    src: picPath
                                });
                            } else {
                                oldPicSrc = oldPicSrc.replace('\\static\\', '..\\..\\..\\public\\');
                                oldPicSrc = path.join(__dirname, oldPicSrc);
                                console.log('oldpicsrc replace to delete: ' + oldPicSrc);
                                fs.unlink(oldPicSrc, function (err) {
                                    if (err) {
                                        fs.unlink(req.file.path, function (err) {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                console.log('tudum file deleted rofl');
                                            }
                                        });
                                        console.error(err);
                                        res.json({
                                            src: '-1'
                                        })
                                    } else {
                                        res.json({
                                            src: picPath
                                        })
                                    }
                                });
                            }
                        }
                    });
                }
            });

            /*
            User.update({
                _id: req.user._id
            }, {
                userPictureSrc: picPath
            }, function (err, raw) {
                if (err) res.json({
                    src: '-1'
                });

                res.json({
                    src: picPath
                });
            });
            */
        }
    });
};

module.exports.getUserActivePic = function (req, res) {
    //console.log('activpic user id: ' + req.user._id)
    User.findOne({
        _id: req.user._id
    }).select('userPictureSrc').exec(function (err, user) {
        if (err) res.json({
            src: '-1'
        });
        if (!user) res.json({
            src: 'null'
        });

        console.log('???? ' + user.userPictureSrc);

        res.json({
            src: user.userPictureSrc
        });
    });
};

module.exports.resetUserPic = function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.error(err);
            res.json({
                message: '-1'
            });
        } else {
            var oldPicSrc = user.userPictureSrc;
            user.userPictureSrc = defUserPicture;
            user.save(function (err) {
                if (err) {
                    console.error(err);
                    res.json({
                        message: '-1'
                    });
                } else {
                    if (oldPicSrc == defUserPicture) {
                        res.json({
                            message: 'Your user picture is now set default.'
                        });
                    } else {
                        oldPicSrc = oldPicSrc.replace('\\static\\', '..\\..\\..\\public\\');
                        oldPicSrc = path.join(__dirname, oldPicSrc);
                        fs.unlink(oldPicSrc, function (err) {
                            if (err) {
                                console.error(err);
                                res.json({
                                    message: '-1'
                                })
                            } else {
                                res.json({
                                    message: 'Your user picture is now set default.'
                                    , src: defUserPicture
                                })
                            }
                        });
                    }
                }
            });
        }
    });

    /*
    User.update({
        _id: req.user._id
    }, {
        userPictureSrc: defUserPicture
    }, function (err, raw) {
        if (err) res.json({
            message: '-1'
        });

        res.json({
            message: 'Your user picture is now set default.'
        });
    });
    */
};

module.exports.getNewsCategories = function (req, res) {
    NewsCategory.find({}).select('categoryname -_id').lean().exec(function (err, newsCategories) {
        if (err) {
            console.log('Error getnewscat: ' + err);
            res.json({
                newscategories: '-1'
            });
        } else {
            res.json(newsCategories);
        }
    });
};

module.exports.getRoles = function (req, res) {
    Role.find({}).select('rolename -_id').lean().exec(function (err, roles) {
        if (err) {
            console.log('Error getnewscat: ' + err);
            res.json({
                roles: '-1'
            });
        } else {
            res.json(roles);
        }
    });
};

module.exports.uploadNews = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            fs.unlink(req.file.path, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('tudum file deleted rofl');
                }
            });
            console.log('error_multer' + err);
            res.send('-1');
        } else {
            Role.findOne({
                rolename: req.body.newsvisibility
            }).select('_id').exec(function (err, role) {
                console.log(role);
                console.log(role._id);
                if (err) {
                    fs.unlink(req.file.path, function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('tudum file deleted rofl');
                        }
                    });
                    console.log('Error uploadnews: ' + err);
                    res.send('-1');
                } else {
                    NewsCategory.findOne({
                        categoryname: req.body.newscategory
                    }).select('_id').exec(function (err, newscategory) {
                        console.log(newscategory);
                        console.log(newscategory._id);
                        if (err) {
                            fs.unlink(req.file.path, function (err) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log('tudum file deleted rofl');
                                }
                            });
                            console.log('Error uploadnews: ' + err);
                            res.send('-1');
                        } else {
                            var picPath = path.join('/static/assets/newsimg/', req.file.filename);

                            var newNews = new News({
                                title: req.body.newstitle
                                , _authorid: req.user._id
                                , picturesrc: picPath
                                , body: req.body.newscontent
                            });

                            newNews._visibility.push(role._id);
                            newNews._categoryid = newscategory._id;

                            newNews.save(function (err, newN) {
                                if (err) {

                                    console.log('Savenewsdb err: ' + err);
                                    res.send('-1');
                                } else {
                                    console.log(newN);
                                    res.send('News added successfuly');
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports.getTmoClans = function (req, res) {
    Team.find({}).select('teamname -_id').exec(function (err, teamList) {
        if (err) {
            console.log('Err getclanslist: ' + err);
            res.send('-1');
        } else {
            console.log('Eheheh: ' + teamList);
            res.json(teamList);
        }
    });
};

module.exports.getTmoMembers = function (req, res) {
    Team.findOne({
        teamnameshort: 'tmo'
    }).select('leaders members -_id').populate({
        path: 'leaders'
        , select: 'tag _id'
    }).populate({
        path: 'members'
        , select: 'tag _id'
    }).exec(function (err, team) {
        if (err) {
            console.log('Err gettmomoembers: ' + err);
            res.send('-1');
        } else {
            console.log(team);
            res.json(team);
        }
    });
};

module.exports.getUsersList = function (req, res) {
    User.find({}).select('tag _id').exec(function (err, userList) {
        if (err) {
            console.log('Err getuserslist: ' + err);
            res.send('-1');
        } else {
            console.log(userList);
            res.json(userList);
        }
    });
};

module.exports.uploadWar = function (req, res) {
    upload_multi(req, res, function (err) {
        if (err) {
            req.files.forEach(function (el) {
                fs.unlink(el.path, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('tudum file deleted rofl');
                    }
                });
            })
            console.log('error_multer' + err);
            res.send('-1');
        } else {
            //console.log(req.body);
            //console.log('req tmolin: ' + req.body.tmoLineUp);
            //console.log('req opplin: ' + req.body.opponentLineUp);

            var warPlayers = [];
            if (Array.isArray(req.body.tmoLineUp)) {
                warPlayers = warPlayers.concat(req.body.tmoLineUp);
            } else {
                warPlayers.push(req.body.tmoLineUp);
            }
            if (Array.isArray(req.body.opponentLineUp)) {
                warPlayers = warPlayers.concat(req.body.opponentLineUp);
            } else {
                warPlayers.push(req.body.opponentLineUp);
            }

            warPlayers = arrayUnique(warPlayers);
            //console.log('warplayesr uniq: ' + warPlayers);

            var newWar = new WarResult;

            User.find({
                tag: {
                    $in: warPlayers
                }
            }).select('_id tag').exec(function (err, users) {
                if (err) {
                    req.files.forEach(function (el) {
                        fs.unlink(el.path, function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('tudum file deleted rofl');
                            }
                        });
                    })
                    console.error('upwar usererr: ' + err);
                    res.send('-1');
                } else {
                    //console.log('users: ' + users);
                    var tmpArr = [];
                    for (let el of users) {
                        tmpArr.push(el.tag);
                        if (Array.isArray(req.body.tmoLineUp)) {
                            if (req.body.tmoLineUp.indexOf(el.tag) != -1) {
                                newWar.tmoLineUp.push(el._id);
                            }
                        } else {
                            if (el.tag == req.body.tmoLineUp) {
                                newWar.tmoLineUp.push(el._id);
                                //break;
                            }
                        }
                        if (Array.isArray(req.body.opponentLineUp)) {
                            if (req.body.opponentLineUp.indexOf(el.tag) != -1) {
                                newWar.opponentLineUp.push(el._id);
                            }
                        } else {
                            if (el.tag == req.body.opponentLineUp) {
                                newWar.opponentLineUp.push(el._id);
                                //break;
                            }
                        }
                        /*
                        if (req.body.tmoLineUp.indexOf(el.tag) != -1) {
                            newWar.tmoLineUp.push(el._id);
                        }
                        if (req.body.opponentLineUp.indexOf(el.tag) != -1) {
                            newWar.opponentLineUp.push(el._id);
                        }
                        */
                    }
                    //console.log('tmolineup: ' + newWar.tmoLineUp);
                    //console.log('opponentlineup: ' + newWar.opponentLineUp);

                    if (Array.isArray(req.body.tmoLineUp)) {
                        for (let el2 of req.body.tmoLineUp) {
                            if (tmpArr.indexOf(el2) == -1) {
                                newWar.tmoLineUpNotUser.push(el2);
                            }
                        }
                    } else {
                        if (tmpArr.indexOf(req.body.tmoLineUp) == -1) {
                            newWar.tmoLineUpNotUser.push(req.body.tmoLineUp);
                        }
                    }
                    if (Array.isArray(req.body.opponentLineUp)) {
                        for (let el3 of req.body.opponentLineUp) {
                            if (tmpArr.indexOf(el3) == -1) {
                                newWar.opponentLineUpNotUser.push(el3);
                            }
                        }
                    } else {
                        if (tmpArr.indexOf(req.body.opponentLineUp) == -1) {
                            newWar.opponentLineUpNotUser.push(req.body.opponentLineUp);
                        }
                    }
                    /*
                    for (let el2 of req.body.tmoLineUp) {
                        if (tmpArr.indexOf(el2) == -1) {
                            newWar.tmoLineUpNotUser.push(el2);
                        }
                    }
                    for (let el3 of req.body.opponentLineUp) {
                        if (tmpArr.indexOf(el3) == -1) {
                            newWar.opponentLineUpNotUser.push(el3);
                        }
                    }
                    */

                    //console.log('tmolineupnotus: ' + newWar.tmoLineUpNotUser);
                    //console.log('opponentlineupnotus: ' + newWar.opponentLineUpNotUser);
                    tmpArr = null;
                    warPlayers = null;

                    //console.log('mapsplayed: ' + req.body.mapsPlayed);
                    if (Array.isArray(req.body.mapsPlayed)) {
                        for (let el4 of req.body.mapsPlayed) {
                            newWar.mapsPlayed.push(el4);
                        }
                    } else {
                        newWar.mapsPlayed.push(req.body.mapsPlayed);
                    }
                    /*for (let el5 of req.body.warResults) {
                        newWar.warResults.push(el5);
                    }*/
                    var overallour = 0;
                    var overalltheir = 0;
                    //console.log('our body: ' + req.body.our[0]);
                    if (Array.isArray(req.body.our)) {
                        for (var i = 0; i < req.body.our.length; i++) {
                            newWar.warResults.push({
                                our: req.body.our[i]
                                , their: req.body.their[i]
                            });
                            overallour += +req.body.our[i];
                            overalltheir += +req.body.their[i];
                        }
                    } else {
                        newWar.warResults.push({
                            our: req.body.our
                            , their: req.body.their
                        });
                        overallour = +req.body.our;
                        overalltheir = +req.body.their;
                    }
                    for (let el6 of req.files) {
                        newWar.warImages.push(path.join('/static/assets/warimg/', el6.filename));
                        //newWar.warImages.push(el6.path.replace('public\\', '\\static\\'));
                        console.log('______+++++++');
                        console.log(el6.path.replace('public\\', '\\static\\'));
                    }
                    if (req.body.warMvp) {
                        newWar.warMvp = req.body.warMvp;
                    }
                    newWar.warReport = req.body.warReport;
                    newWar.opponentName = req.body.opponentName;
                    newWar.tmoTeamPic = defTmoPic;
                    newWar.overallScore = {
                        our: overallour
                        , their: overalltheir
                    };
                    if (overallour > overalltheir) {
                        newWar.warStatus = 'WIN';
                    } else if (overallour < overalltheir) {
                        newWar.warStatus = 'LOST';
                    } else {
                        newWar.warStatus = 'DRAW';
                    }

                    Team.findOne({
                        teamname: req.body.opponentName
                    }).select('logosrc _id').exec(function (err, team) {
                        if (err) {
                            req.files.forEach(function (el) {
                                fs.unlink(el.path, function (err) {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        console.log('tudum file deleted rofl');
                                    }
                                });
                            })
                            console.error('upwar teamerr: ' + err);
                            res.send('-1');
                        } else {
                            if (team) {
                                console.log('oppteamid: ' + team._id);
                                newWar.opponentTeamId = team._id;
                                newWar.opponentTeamPic = team.logosrc;
                            } else {
                                newWar.opponentTeamPic = defOpponentPic;
                            }
                            //console.log('newwar: ' + newWar);

                            newWar.save(function (err, addedWar) {
                                if (err) {
                                    req.files.forEach(function (el) {
                                        fs.unlink(el.path, function (err) {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                console.log('tudum file deleted rofl');
                                            }
                                        });
                                    })
                                    console.error('upwar teamerr: ' + err);
                                    res.send('-1');
                                } else {
                                    console.log('addedwar: ' + addedWar);
                                    res.send('OK added finally..');
                                }
                            });
                        }
                    })
                }
            });
        }
    });
};

module.exports.getTeamNames = function (req, res) {
    Team.find({
        teamname: {
            $ne: 'The Myth of'
        }
    }).select('teamname -_id').exec(function (err, teamList) {
        if (err) {
            console.log('Err getclanslist: ' + err);
            res.send('-1');
        } else {
            console.log('Eheheh: ' + teamList);
            res.json(teamList);
        }
    });
};

module.exports.uploadTeam = function (req, res) {
    upload(req, res, function (err) {
        console.log(req.user._id);
        if (err) {
            console.log(err);
            fs.unlink(req.file.path, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('tudum file deleted rofl');
                }
            });
            console.log('error_multer' + err);
            res.send('-1');
        } else {
            var picPath = path.join('/static/assets/teamimg/', req.file.filename);

            var newTeam = new Team;

            newTeam.teamname = req.body.teamname;
            newTeam.teamnameshort = req.body.teamnameshort;
            newTeam.logosrc = picPath;
            newTeam.createdby = req.user._id;

            newTeam.save(function (err2, savedTeam) {
                if (err2) {
                    fs.unlink(req.file.path, function (err3) {
                        if (err3) {
                            console.error(err3);
                        } else {
                            console.log('tudum file teamimg deleted rofl');
                        }
                    });
                    console.log('error_multer' + err);
                    res.send('-1');
                } else {
                    console.log(savedTeam);
                    res.send('Team added to db.');
                }
            });
        }
    });
}

module.exports.removeTeam = function (req, res) {
    console.log(req.params.teamname);
    Team.findOneAndRemove({
        teamname: req.params.teamname
    }, function (err, removedTeam) {
        if (err) {
            console.log(err);
            res.send('-1');
        } else {
            if (!removedTeam) {
                console.log(removedTeam);
                console.log('couldnt find such team');
                res.send('-1');
            } else {
                res.send('Team deleted successfuly!');
            }
        }
    });
}

/* ----------------------------------------------------
                UTIL
   ------------------------------------------------- */

// for array concat usage with unique elements in this arr
function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}