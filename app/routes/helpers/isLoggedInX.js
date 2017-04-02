'use strict'

module.exports = function(req, res, next) {
	if(req.isAuthenticated()) {
        return next();
    } else {
        res.render('tmo/schedule');
    }
};