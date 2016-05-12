'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment');
var Counter = require('./counter');
//var autoPopulate = require('mongoose-autopopulate');

var NewsSchema = new Schema({
    newsid: {
        type: Number
        , required: true
    }
    , _authorid: {
        type: Schema.Types.ObjectId
        , ref: 'User'
    }
    , _visibility: [{ // whose users (roleid) can see the news
        type: Schema.Types.ObjectId
        , ref: 'Role'
	}]
    , title: {
        type: String
        , required: true
    }
    , picturesrc: {
        type: String
        , required: true
    }
    , body: {
        type: String
        , required: true
    }
    , date: {
        type: Date
        , required: true
        , default: Date.now
    }
    , _categoryid: {
        type: Schema.Types.ObjectId
        , ref: 'NewsCategory'
    }
    , commentscount: {
        type: Number
        , required: true
        , default: 0
    }
    , comments: [{
        type: Schema.Types.ObjectId
        , ref: 'Comment'
        , autopopulate: {
            select: '-_id'
        }
    }]
});

//NewsSchema.plugin(autoPopulate);

NewsSchema.pre('validate', function (callback) {
    var self = this;

    Counter.generateNextSequence('newsid', function (err, result) {
        if (err) throw err;

        self.newsid = result.seq;

        callback();
    });
});

module.exports = mongoose.model('News', NewsSchema);