'use strict'

var mongoose = require('mongoose');
var Counter = mongoose.model('Counter');
var News = mongoose.model('News');
var Comment = mongoose.model('Comment');

module.exports.getLatestNewsAndWars = function (req, res) {
    console.log('[controller] im about to render news page');

    console.log('user roles: ' + req.user._roleid);
    News.count({
        _visibility: {
            $in: req.user._roleid
        }
    }, function (err, count) {
        if (err) throw err;
        News.find({
            _visibility: {
                $in: req.user._roleid
            }
        }).populate('_authorid', 'userid tag -_id').limit(3).sort({
            date: 'desc'
        }).select('newsid title body commentscount picturesrc date _authorid -_id').exec(function (err2, result) {
            if (err2) throw err2;

            console.log('result /index: ' + result);

            res.render('tmo/index.ejs', {
                latestNews: result
                , page: 1
                , pages: Math.ceil(count / 3)
            });
        });
    });

    /*
    News.count({ visibility: { $lte: req.user.roleId }}, function (err, count) {
        if (err)
            throw err;
        console.log('count: ' + count + ' pages: ' + Math.ceil(count / 3));
        News.find({
            visibility: {
                $lte: req.user.roleId
            }
        }).limit(3).sort({
            date: 'desc'
        }).select('-_id -visibility -comments').exec(function (err, result) {
            if (err)
                throw err;
            console.log(result);
            res.render('tmo/index.ejs', {
                latestNews: result,
                page: 1,
                pages: Math.ceil(count / 3)
            });
        });
    });
    */

    /*
	Counter.generateNextSequence('newsid', function(err, result){
		if(err) throw err;
		
		var newNews = new News();
		newNews.newsid = result.seq;
		newNews.authorid = req.user.userid;
		newNews.visibility = 1;
		newNews.title = 'tmo news title';
		newNews.pictureSrc = '/static/_old/images/prototypes_v3/elementy/1624649_1132838826727341_934553642_n.jpg';
		newNews.body = '<p>test news content</p>';
		newNews.save(function(err) {
			if (err)
				throw err;
			//return done(null, newUser);
			
			console.log(newNews);
		
			res.render('tmo/index.ejs', { news: newNews });
		});
		
		//console.log(newNews);
		
		//res.render('tmo/index.ejs', { news: newNews });
	});
	*/
    // get and render news
    //res.render('tmo/index.ejs');
};

module.exports.getAllNews = function (req, res) {
    News.find({
        _visibility: {
            $in: req.user._roleid
        }
    }).populate('_authorid', 'userid tag -_id').populate('_categoryid', 'picturesrc categoryname -_id').sort({
        date: 'desc'
    }).select('newsid title commentscount date _authorid _categoryid -_id').exec(function (err, news) {
        if (err)
            throw err;
        console.log(news);
        res.render('tmo/news-list.ejs', {
            news: news
        });
    });
};

module.exports.getNewsById = function (req, res) {
    News.findOne({
        $and: [{
            newsid: req.params.newsid
            }, {
            _visibility: {
                $in: req.user._roleid
            }
        }]
    }).populate('_authorid', 'userid tag -_id').populate('_categoryid', 'categoryname picturesrc -_id') /*.populate('comments', '-_id')*/ .sort({
        date: 'desc'
    }).select('newsid picturesrc title body commentscount date _authorid _categoryid comments').exec(function (err, news) {
        //console.log(news);
        if (err)
            throw err;
        if (!news)
            res.send('no news with such id :[');
        else
            res.render('tmo/news-id.ejs', {
                news: news,
                loggedUserId: req.user.userid
            });
    });
};

module.exports.getPage = function (req, res) {
    console.log('pageid: ' + req.params.pageid);
    var page = (req.params.pageid > 0 ? req.params.pageid : 1) - 1;
    console.log('page: ' + page);

    News.count({
        _visibility: {
            $in: req.user._roleid
        }
    }, function (err, count) {
        if (err) throw err;
        News.find({
            _visibility: {
                $in: req.user._roleid
            }
        }).populate('_authorid', 'userid tag -_id').limit(3).sort({
            date: 'desc'
        }).skip(3 * page).select('newsid title body picturesrc commentscount date _authorid -_id').exec(function (err2, result) {
            if (err2) throw err2;

            console.log('result /news/page: ' + result);

            res.render('tmo/index.ejs', {
                latestNews: result
                , page: (page + 1)
                , pages: Math.ceil(count / 3)
            });

            /*
            var newNews = News({ _authorid: req.user._id,
                                title: 'tmo title 1',
                                _visibility: req.user._roleid,
                                pictureSrc: '/static/_old/images/prototypes_v3/elementy/1624649_1132838826727341_934553642_n.jpg',
                                body: '<p>We liked to share with ya, that our Clan will take part in the Survive Cup. We hope we can bring alot fun with us, and fight for the win.</p><p>We reached the Final and wait now for our Final Opponent in this Cup.</p><p>GL to both teams</p>'
                               });
            newNews.save(function(err){
                if(err) throw err;
                res.send('udalosie');
            })
            */
        });
    });

    /*
    News.count({
        visibility: {
            $lte: req.user.roleId
        }
    }, function (err, count) {
        if (err)
            throw err;
        console.log('count: ' + count + ' page: ' + (page + 1) + ' pages: ' + Math.ceil(count / 3));

        News.find({
            visibility: {
                $lte: req.user.roleId
            }
        }).limit(3).sort({
            date: 'desc'
        }).skip(3 * page).select('-_id -visibility -comments').exec(function (err, result) {
            if (err)
                throw err;

            res.render('tmo/index.ejs', {
                latestNews: result
                , page: (page + 1)
                , pages: Math.ceil(count / 3)
            });
        });
    });
    */
};

module.exports.addComment = function (req, res) {
    var newComment = new Comment({
        _userid: req.user._id
        , _newsid: req.body._news_id
        , body: req.body._body
    });
    console.log('parentCommentId ' + req.body.parentCommentId);
    if (req.body.parentCommentId == 0) {
        News.findOneAndUpdate({
            _id: req.body._news_id
        }, {
            $push: {
                comments: newComment
            }
            , $inc: {
                commentscount: 1
            }
        }, {
            new: true
        }, function (err, updatedNews) {
            if (err) throw err;
            // res.send('Updated following user' + updatedUser);
            newComment.save(function (err, newCom) {
                if (err) throw err;
                res.send({ msg: 'Comment added successfuly!', comId: newCom.commentid });
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
                News.findOneAndUpdate({
                    _id: req.body._news_id
                }, {
                    $inc: {
                        commentscount: 1
                    }
                }, {
                    new: true
                }, function (err, updatedNews) {
                    if (err) throw err;
                    res.send({ msg: 'Comment added successfuly!' });
                });
            });
        });
    } else {
        console.log('im here');
        res.send({ msg: 'Ups.. something went wrong mehhhhhhhh...' });
    }
};