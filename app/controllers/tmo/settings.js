'use strict'

var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var NewsCategory = mongoose.model('NewsCategory');

var defUserPicture = '/static/images/tmoolympus/const_elements/tmocomments-defaultuserphoto2.png';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/avatars/')
    }
    , filename: function (req, file, cb) {
        cb(null, req.user._id + '_' + Date.now() + '-' + file.originalname)
    }
});

var upload = multer({
    storage: storage
}).single('file');

module.exports.getSettings = function (req, res) {
    res.sendFile(path.join(__dirname, '../../../public/settings.html'));
};

module.exports.userUpdatePic = function (req, res) {
    upload(req, res, function (err) {
        console.log(req.user._id);
        if (err) {
            console.log('error_multer' + err);
            res.json({
                src: -1
            });
        } else {
            var picPath = path.join('/static/assets/avatars/', req.file.filename);

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

        res.json({
            src: user.userPictureSrc
        });
    });
};

module.exports.resetUserPic = function (req, res) {
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