'use strict'

var User = require('mongoose').model('User');

var rolesTmoMSA = ['tmo member', 'superadmin'];
var rolesTmoLSA = ['tmo leadership', 'superadmin'];
var rolesTmoMLSA = ['tmo member', 'tmo leadership', 'superadmin'];
var rolesSA = ['superadmin'];
var rolesSiteUser = ['site user', 'superadmin'];

// such middleware doesn't work
module.exports.tmoMSA = function (req, res, next) {
    console.log('tmoMSA');
    var acceptanceFlag = false;
    console.log(rolesTmoMSA);
    console.log(req.user._id);
    User.findOne({
        _id: req.user._id
    }).populate('_roleid', '-_id rolename').select('-_id _roleid').exec(function (err, user) {
        if (err) {
            res.send('Settings page cannot be loaded.');
        } else {
            //var userRoles = [];
            //console.log(user);
            if (user._roleid) {
                console.log('__roleid__');
                console.log(user._roleid);
                user._roleid.forEach(function (role) {
                    //userRoles.push(role.rolename);
                    if (rolesTmoMSA.indexOf(role.rolename) != -1) {
                        acceptanceFlag = true;
                        //return next();
                    }
                });
                if (acceptanceFlag) {
                    return next();
                } else {
                    res.send('Unauthorized execution..1_MSA');
                }
            } else {
                res.send('Unauthorized execution..2_MSA');
            }
        }
    });
};

module.exports.tmoLSA = function (req, res, next) {
    console.log('tmoLSA');
    var acceptanceFlag = false;
    console.log(rolesTmoLSA);
    console.log(req.user._id);
    User.findOne({
        _id: req.user._id
    }).populate('_roleid', '-_id rolename').select('-_id _roleid').exec(function (err, user) {
        if (err) {
            res.send('Settings page cannot be loaded.');
        } else {
            //var userRoles = [];
            //console.log(user);
            if (user._roleid) {
                console.log('__roleid__');
                console.log(user._roleid);
                user._roleid.forEach(function (role) {
                    //userRoles.push(role.rolename);
                    if (rolesTmoLSA.indexOf(role.rolename) != -1) {
                        acceptanceFlag = true;
                        //return next();
                    }
                });
                if (acceptanceFlag) {
                    return next();
                } else {
                    res.send('Unauthorized execution..1_LSA');
                }
            } else {
                res.send('Unauthorized execution..2_LSA');
            }
        }
    });
};

module.exports.tmoMLSA = function (req, res, next) {
    console.log('tmoMLSA');
    var acceptanceFlag = false;
    console.log(rolesTmoMLSA);
    console.log(req.user._id);
    User.findOne({
        _id: req.user._id
    }).populate('_roleid', '-_id rolename').select('-_id _roleid').exec(function (err, user) {
        if (err) {
            res.send('Settings page cannot be loaded.');
        } else {
            //var userRoles = [];
            //console.log(user);
            if (user._roleid) {
                console.log('__roleid__');
                console.log(user._roleid);
                user._roleid.forEach(function (role) {
                    //userRoles.push(role.rolename);
                    if (rolesTmoMLSA.indexOf(role.rolename) != -1) {
                        acceptanceFlag = true;
                        //return next();
                    }
                });
                if (acceptanceFlag) {
                    return next();
                } else {
                    res.send('Unauthorized execution..1_MLSA');
                }
            } else {
                res.send('Unauthorized execution..2_MLSA');
            }
        }
    });
};

module.exports.tmoSA = function (req, res, next) {
    console.log('tmoSA');
    var acceptanceFlag = false;
    console.log(rolesSA);
    console.log(req.user._id);
    User.findOne({
        _id: req.user._id
    }).populate('_roleid', '-_id rolename').select('-_id _roleid').exec(function (err, user) {
        if (err) {
            res.send('Settings page cannot be loaded.');
        } else {
            //var userRoles = [];
            //console.log(user);
            if (user._roleid) {
                console.log('__roleid__');
                console.log(user._roleid);
                user._roleid.forEach(function (role) {
                    //userRoles.push(role.rolename);
                    if (rolesSA.indexOf(role.rolename) != -1) {
                        acceptanceFlag = true;
                        //return next();
                    }
                });
                if (acceptanceFlag) {
                    return next();
                } else {
                    res.send('Unauthorized execution..1_SA');
                }
            } else {
                res.send('Unauthorized execution..2_SA');
            }
        }
    });
};

module.exports.tmoSiteUser = function (req, res, next) {
    console.log('tmoSiteUser');
    var acceptanceFlag = false;
    console.log(rolesSiteUser);
    console.log(req.user._id);
    User.findOne({
        _id: req.user._id
    }).populate('_roleid', '-_id rolename').select('-_id _roleid').exec(function (err, user) {
        if (err) {
            res.send('Settings page cannot be loaded.');
        } else {
            //var userRoles = [];
            //console.log(user);
            if (user._roleid) {
                console.log('__roleid__');
                console.log(user._roleid);
                user._roleid.forEach(function (role) {
                    //userRoles.push(role.rolename);
                    if (rolesSiteUser.indexOf(role.rolename) != -1) {
                        acceptanceFlag = true;
                        //return next();
                    }
                });
                if (acceptanceFlag) {
                    return next();
                } else {
                    res.send('Unauthorized execution..1_SiteUser');
                }
            } else {
                res.send('Unauthorized execution..2_SiteUser');
            }
        }
    });
};