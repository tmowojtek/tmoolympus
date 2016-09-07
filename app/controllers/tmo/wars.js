'use strict'

var mongoose = require('mongoose');
var User = mongoose.model('User');
var WarResult = mongoose.model('WarResult');
var Comment = mongoose.model('Comment');
var defNumOfWarsInList = 15;

module.exports.getWarsList = function (req, res) {
    WarResult.aggregate([{
        $group: {
            _id: '$warStatus'
            , count: {
                $sum: 1
            }
        }
    }], function (err, countResult) {
        if (err) {
            res.render('tmo/war-list', {
                stats: null
                , wars: null
            });
        } else {
            var win = 0;
            var lost = 0;
            var draw = 0;

            //console.log('countResult: ' + countResult);
            //console.log(countResult);
            //console.log(countResult[0]._id);
            //console.log(countResult[0].count);

            countResult.forEach(function (oneResult) {
                if (oneResult._id == 'WIN')
                    win = oneResult.count;
                else if (oneResult._id == 'LOST')
                    lost = oneResult.count;
                else if (oneResult._id == 'DRAW')
                    draw = oneResult.count;
            });

            WarResult.find({}).sort({
                timestamp: 'desc'
            }).select('-_id warid opponentName opponentTeamPic tmoTeamPic overallScore timestamp').limit(defNumOfWarsInList).exec(function (err2, wars) {
                if (err2) {
                    res.render('tmo/war-list', {
                        stats: null
                        , wars: null
                    });
                } else {
                    res.render('tmo/war-list', {
                        stats: {
                            win: win
                            , lost: lost
                            , draw: draw
                        }
                        , wars: wars
                    });
                }
            });
        }
    });
};

module.exports.getNextWarsBatch = function (req, res) {
    var nextBatchNum = req.params.nextBatch;

    WarResult.find({}).sort({
        timestamp: 'desc'
    }).select('-_id warid opponentName opponentTeamPic tmoTeamPic overallScore timestamp').limit(defNumOfWarsInList).skip(defNumOfWarsInList * nextBatchNum).exec(function (err, wars) {
        if (err) {
            res.send({
                msg: '-1'
            });
        } else {
            if (wars.length > 0) {
                res.send({
                    msg: '1'
                    , wars: wars
                });
            } else {
                res.send({
                    msg: '2'
                });
            }
        }
    });
}

module.exports.getWarById = function (req, res) {
    User.findOne({
        _id: req.user._id
    }).populate('_roleid', '-_id rolename').select('-_id _roleid').exec(function (err1, user) {
        if (err1) {
            res.send('User error..');
        }
        console.log(user);
        var isTmoMLSA = false;
        user._roleid.forEach(function (role) {
            if ((role.rolename == 'tmo leadership') || (role.rolename == 'superadmin') || (role.rolename == 'tmo member')) {
                isTmoMLSA = true;
            }
        });

        WarResult.findOne({
            warid: req.params.warid
        }).populate('tmoLineUp', '-_id tag userPictureSrc').populate('opponentLineUp', '-_id tag userPictureSrc').exec(function (err, war) {
            if (err) {
                res.send('Server-sided error..');
            } else {
                if (!war) {
                    res.send('The war you asked our db about doesn\'t exist or smth. bad has happened to our resources..');
                } else {
                    res.render('tmo/war-id', {
                        isTmoMLSA: isTmoMLSA
                        , war: war
                        , loggedUserId: req.user.userid
                    });
                }
            }
        });
    });
};

module.exports.addComment = function (req, res) {
    var newComment = new Comment({
        _userid: req.user._id
        , _warid: req.body._war_id
        , body: req.body._body
    });
    console.log('parentCommentId ' + req.body.parentCommentId);
    if (req.body.parentCommentId == 0) {
        WarResult.findOneAndUpdate({
            _id: req.body._war_id
        }, {
            $push: {
                comments: newComment
            }
            , $inc: {
                commentscount: 1
            }
        }, {
            new: true
        }, function (err, updatedWar) {
            if (err) throw err;
            // res.send('Updated following user' + updatedUser);
            newComment.save(function (err, newCom) {
                if (err) throw err;
                console.log('comment addedsucc 0parent');
                res.send({
                    msg: 'Comment added successfuly!'
                    , comId: newCom.commentid
                });
            })
        });
    } else if (req.body.parentCommentId > 0) {
        Comment.findOneAndUpdate({
            commentid: req.body.parentCommentId
        }, {
            $push: {
                comments: newComment
            }
        }, {
            new: true
        }, function (err, updatedComment) {
            if (err) throw err;
            newComment.save(function (err, newCom) {
                if (err) throw err;
                WarResult.findOneAndUpdate({
                    _id: req.body._war_id
                }, {
                    $inc: {
                        commentscount: 1
                    }
                }, {
                    new: true
                }, function (err, updatedWar) {
                    if (err) throw err;
                    console.log('jestem tutaj i zwracam za moment info o komentarzu!!');
                    res.send({
                        msg: 'Comment added successfuly!'
                    });
                });
            });
        });
    } else {
        console.log('im here');
        res.send({
            msg: 'Ups.. something went wrong mehhhhhhhh...'
        });
    }
}

module.exports.deleteWarById = function(req, res) {
    WarResult.findOneAndRemove({warid: req.params.warid}, function(err, deletedWar) {
        if(err) {
            console.log(err);
            res.send({msg: '-1',
                     msgDetail: 'Server-sided error happened while deleting this war.'});
        } else {
            res.send({msg: 'War was deleted successfuly!'});
        }
    });
};