'use strict'

module.exports.logout = function(req, res) {
    req.logout();
    //req.session.destroy();
    res.redirect('/');
};