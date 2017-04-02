'use strict'

module.exports.returnIndexPage = function (req, res) {
    res.render('tmo/league');
};

module.exports.returnAdminSchedulePage = function(req, res) {
    res.render('tmo/schedule_adm');
}