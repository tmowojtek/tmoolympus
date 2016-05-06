'use strict'

var mongoose = require('mongoose');
var Counter = mongoose.model('Counter');
var News = mongoose.model('News');

module.exports.getLatestNewsAndWars = function(req, res) {
	console.log('[controller] im about to render news page');
	
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
	
	// get and render news
	//res.render('tmo/index.ejs');
};

module.exports.getAllNews = function(req, res) {
	
};

module.exports.getNewsById = function(req, res) {
	
};

module.exports.getNextOrPrevThreeNews = function(req, res) {
	
};