'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');

var WarResultSchema = new Schema({
    warid: {
        type: Number
        , required: true
        , unique: true
    }
    , opponentName: {
        type: String
        , required: true
    }
    , opponentTeamId: {
        type: Schema.Types.ObjectId
        , ref: 'Team'
    }
    , opponentTeamPic: {
        type: String
    }
    , tmoTeamPic: {
        type: String
    }
    , tmoLineUp: [{
        type: Schema.Types.ObjectId
        , ref: 'User'
    }]
    , tmoLineUpNotUser: [{
        type: String
    }]
    , opponentLineUp: [{
        type: Schema.Types.ObjectId
        , ref: 'User'
    }]
    , opponentLineUpNotUser: [{
        type: String
    }]
    , mapsPlayed: [{
        type: String
        , required: true
    }]
    , warResults: [{
        our: {
            type: Number
            , required: true
        }
        , their: {
            type: Number
            , required: true
        }
    }]
    , overallScore: {
        our: {
            type: Number
            , required: true
        }
        , their: {
            type: Number
            , required: true
        }
    }
    , warImages: [{
        type: String
    }]
    , warMvp: {
        type: String
    }
    , warReport: {
        type: String
        , required: true
    }
    , timestamp: {
        type: Date
        , required: true
        , default: Date.now
    }
});

WarResultSchema.pre('validate', function (callback) {
    var self = this;

    if (!self.warid) {
        Counter.generateNextSequence('warid', function (err, result) {
            if (err)
                throw err;

            self.warid = result.seq;

            callback();
        });
    } else {
        callback();
    }
});

module.exports = mongoose.model('WarResult', WarResultSchema);