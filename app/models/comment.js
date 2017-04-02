'use strict'

var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = require(path.join(__dirname, 'counter'));
//var autoPopulate = require('mongoose-autopopulate');

var CommentSchema = new Schema({
    commentid: {
        type: Number
        , required: true
        , unique: true
    }
    , _userid: {
        type: Schema.Types.ObjectId
        , ref: 'User',
        autopopulate: {
            select: 'userid tag userPictureSrc -_id'
        }
    }
    , _newsid: {
        type: Schema.Types.ObjectId
        , ref: 'News'
    }
    , _warid: {
        type: Schema.Types.ObjectId
        , ref: 'WarResult'
    }
    , body: {
        type: String
        , required: true
    }
    , date: {
        type: Date
        , default: Date.now
        , required: true
    }
    , lasteditdate: {
        type: Date
    }
    , comments: [{
        type: Schema.Types.ObjectId
        , ref: 'Comment'
        , autopopulate: {
            select: '-_id'
        }
    }]
});

//CommentSchema.plugin(autoPopulate);

CommentSchema.pre('validate', function (callback) {
    var self = this;

    Counter.generateNextSequence('commentid', function (err, result) {
        if (err) throw err;

        self.commentid = result.seq;

        callback();
    });
});

module.exports = mongoose.model('Comment', CommentSchema);