'use strict'

var mongoose = require('mongoose');
var NewsCategory = mongoose.model('NewsCategory');
var Role = mongoose.model('Role');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var News = mongoose.model('News');

module.exports.createNewsCategory = function (req, res) {
    var newsCategory = new NewsCategory({
        categoryname: 'TMO News'
        , picturesrc: '/static/_old/images/_ikony_list_news/star.png'
    });

    newsCategory.save(function (err, newsCat) {
        if (err) throw err
        res.send('Created following news category' + newsCat);
    })
};

module.exports.createRole = function (req, res) {
    var newRole = new Role({
        rolename: 'SuperAdmin'
    });

    newRole.save(function (err, newRol) {
        if (err) throw err;
        res.send('Created following role' + newRol);
    });
}

module.exports.createUser = function (req, res) {
    var tag = 'test';
    var pw = 'test';
    var email = 'test@test';

    var newUser = new User({
        tag: tag
        , taglowercase: tag.toLowerCase()
        , pw: pw
        , email: email
    });

    newUser.save(function (err, newUs) {
        if (err) throw err
        res.send('Created following user' + user);

        /* // Uncomment and use to append new roles to user roles
        Role.findOne({
            rolename: 'user'
        }).select('_id').exec(function (err, resultrole) {
            User.findOneAndUpdate({
                tag: 'test'
            }, {
                $push: {
                    _roleid: resultrole._id
                }
            }, {
                new: true
            }, function (err, updatedUser) {
                if (err) throw err;
                res.send('Updated following user' + updatedUser);
            });
        });
        */
    });
};

module.exports.createComment = function (req, res) {
    var newComment = new Comment({
        _userid: '5731d325d49d97d409390316'
        , _newsid: '572f6b2c60019e8007367aba'
        , body: '<p>Testowy komentarz by me</p>'
    });
    
    var newComment2 = new Comment({
        _userid: '5731d325d49d97d409390316'
        , _newsid: '572f6b2c60019e8007367aba'
        , body: '<p>Testowy komentarz 2 by me</p>'
    });
    
    newComment.comments.push(newComment2);
    
    var test = newComment.comments[0];
    console.log(test + ' is new: ' + test.isNew);
    
    newComment.save(function (err, newCom) {
        if (err) throw err;
        res.send('Created following comment: ' + newCom);
        /*
        Comment.find(function(err, com) {
            console.log(com);
            res.send('Created following comment: ' + com);
        });
        */
    });
    newComment2.save();
};

module.exports.createNews = function(req, res) {
    var newNews = new News({
        title: 'Lorem ipsum dolor sit amet',
        _authorid: '572f65fe4e88e9d006cd8b68',
        picturesrc: '/static/_old/images/prototypes_v3/elementy/1624649_1132838826727341_934553642_n.jpg',
        body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis mollis elementum. Donec tempor, leo et ornare efficitur, lectus ex placerat purus, eu blandit velit enim nec massa. Nam consectetur vitae sem id bibendum. Nulla sit amet massa eget nisi tristique fermentum nec ac metus. Morbi pharetra ante vitae condimentum gravida. Mauris sollicitudin posuere lobortis. Nulla purus orci, elementum ut tincidunt quis, fermentum in quam. Sed commodo nibh vel orci ullamcorper, eu volutpat tellus ullamcorper. Vestibulum id elit sit amet urna tempor blandit. Vestibulum molestie id nunc eget placerat. Vestibulum efficitur quis lorem quis sollicitudin. Aliquam elementum volutpat magna eget semper.</p><p>Nulla venenatis, urna in imperdiet pharetra, arcu felis imperdiet lorem, vel tempor massa est ac arcu. Mauris ac eros at nulla euismod dignissim et sed est. Ut sed dapibus velit. Etiam suscipit metus nisl, sed finibus tortor convallis vitae. Nullam vestibulum purus quam, sed malesuada lectus mollis gravida. Morbi felis sapien, rutrum non faucibus eu, placerat vitae nunc. Quisque lobortis vulputate quam, eu consectetur nisl ornare vitae. Vestibulum magna felis, interdum a neque in, pharetra suscipit urna. Ut aliquam rutrum nibh, ac pellentesque nibh. Donec eget placerat nisi. Maecenas ligula leo, placerat scelerisque lorem eu, molestie sollicitudin erat. Proin eu velit nulla. Donec iaculis blandit velit mattis hendrerit.</p><p>Fusce quis ligula nisl. Fusce in odio ligula. Ut faucibus vehicula eros, nec tristique justo iaculis vel. Donec leo lacus, dictum vel massa ut, convallis venenatis risus. Nunc bibendum augue vitae consequat eleifend. Nam porta ligula a blandit pretium. Sed leo nisi, sagittis a orci ac, tincidunt rutrum quam. Cras mattis nunc sit amet nibh consectetur, eget posuere leo fermentum. Donec ultricies lectus turpis, cursus consectetur justo suscipit non. Sed ultricies aliquam orci vel ornare. Pellentesque maximus condimentum semper. Ut at diam ullamcorper, eleifend odio ut, vehicula leo.</p><p>Pellentesque id egestas orci. Pellentesque tempus sed enim et gravida. Curabitur quis dictum ex, eu porttitor orci. Nullam nec dolor at erat mattis aliquam quis id neque. In vel rhoncus est, sit amet maximus tellus. Aenean vulputate mi ac augue mattis, ut rutrum dui luctus. Morbi a sem libero. Donec at justo vitae turpis finibus sodales. Nulla sed tempus nulla. Phasellus nibh nisi, ornare non enim at, commodo aliquet tortor. Nulla eu varius nulla. Duis neque eros, pharetra nec dolor sed, elementum hendrerit arcu.</p><p>Aenean maximus libero in turpis aliquet, sed hendrerit sem commodo. In hac habitasse platea dictumst. Maecenas pellentesque, tortor a laoreet pulvinar, augue dolor ultrices ex, ut euismod quam arcu non velit. Cras imperdiet consectetur mauris, at commodo dolor aliquet nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur blandit faucibus enim, in luctus erat dictum at. Duis mollis enim nec efficitur ornare. Fusce dapibus nec justo in posuere. Suspendisse tempus nec nunc tristique eleifend. Vestibulum et augue tincidunt, tincidunt leo sit amet, imperdiet velit. Etiam at urna ante. Nunc placerat quam et elit dapibus mollis.</p><p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent id ligula velit. Ut neque arcu, convallis et cursus ac, tempor quis augue. Quisque eu finibus nibh. Integer vehicula quis augue vitae hendrerit. Mauris cursus ex sit amet sapien mattis feugiat eget nec lacus. Phasellus quis pellentesque purus. Mauris aliquet sagittis ligula, vel semper quam bibendum in. In mattis faucibus diam sit amet viverra. Etiam convallis quam ac turpis dapibus, ut posuere lectus auctor.</p>',
        /*comments: [ '57342b889ed415480595bf9d' ],
        _visibility: [ '572f3ae38ccc11ac0a736b51', '5731c985c6d5bbf4042b115d' ],
        _categoryid: '5731c2c5773a564409281f6a',
        commentscount: 2*/
    });
    
    newNews.save(function(err, newN){
        if (err) throw err;
        res.send('Nowy news zostal dodany: ' + newNews);
    });
};