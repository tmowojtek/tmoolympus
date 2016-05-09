'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');

var maxlength = [6, 'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];

var TeamSchema = new Schema({
    teamid: {
        type: Number
        , required: true
        , unique: true
    }
    , teamname: {
        type: String
        , required: true
        , unique: true
    }
    , teamnameshort: {
        type: String
        , maxlength: maxlength
    , }
    , logosrc: {
        type: String
        , required: true
    }
    , createdby: {
        type: Schema.Types.ObjectId
        , ref: 'User'
        , required: true
    }
    , leaders: [{
        type: Schema.Types.ObjectId
        , ref: 'User'
    }]
    , members: [{
        type: Schema.Types.ObjectId
        , ref: 'User'
    }]
});

TeamSchema.pre('validate', function (callback) {
    var self = this;

    Counter.generateNextSequence('teamid', function (err, result) {
        if (err) throw err;

        self.teamid = result.seq;

        callback();
    })
});

module.exports = mongoose.model('Team', TeamSchema);