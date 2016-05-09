'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId
        , ref: 'User'
    }
    , body: {
        type: String
        , required: true
    }
    , date: {
        type: Date
        , default: Date.now
    }
    , comments: [{
        type: Schema.Types.ObjectId
        , ref: 'Comment'
    }]
});

module.exports = mongoose.model('Comment', CommentSchema);