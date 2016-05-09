'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');

var TeamWarRosterSchema = new Schema({
    _teamid: {
        type: Schema.Types.ObjectId
        , ref: 'Team'
    }
    , warroster: [{
        type: Schema.Types.ObjectId
        , ref: 'User'
    }]
});

var PartialScoreSchema = new Schema({
    teamascore: {
        type: Number
        , required: true
    }
    , teambscore: {
        type: Number
        , required: true
    }
});

var MapSchema = new Schema({
    mapname: {
        type: String
        , required: true
    }
    , partialScores: [{
        type: Schema.Types.ObjectId
        , ref: 'PartialScore'
        , required: true
    }]
});

var WarScoreSchema = new Schema({
    teamafinalscore: {
        type: Number
        , required: true
    }
    , teambfinalscore: {
        type: Number
        , required: true
    }
    , mapsplayed: [{
        type: Schema.Types.ObjectId
        , ref: 'Map'
        , required: true
    }]
});


var WarDetailsSchema = new Schema({
    warsize: {
        type: String
        , required: true
    }
    , date: {
        type: Date
        , required: true
        , default: Date.now
    }
    , warmvptag: {
        type: String
    , }
    , warwinner: {
        type: String
        , required: true
    }
    , warscore: {
        type: Schema.Types.ObjectId
        , ref: 'WarScore'
        , required: true
    }
});

var WarResultSchema = new Schema({
    warid: {
        type: Number
        , required: true
        , unique: true
    }
    , wardetails: {
        type: Schema.Types.ObjectId
        , ref: 'WarDetails'
        , required: true
    }
    , teama: {
        type: Schema.Types.ObjectId
        , ref: 'TeamWarRoster'
        , required: true
    }
    , teamb: {
        type: Schema.Types.ObjectId
        , ref: 'TeamWarRoster'
        , required: true
    }
});

WarResultSchema.pre('validate', function (callback) {
    var self = this;

    Counter.generateNextSequence('warid', function (err, result) {
        if (err)
            throw err;

        self.warid = result.seq;

        callback();
    });
});

/*
mongoose.model('TeamWarRoster', TeamWarRosterSchema);
mongoose.model('PartialScore', PartialScoreSchema);
mongoose.model('Map', MapSchema);
mongoose.model('WarScore', WarScoreSchema);
mongoose.model('WarDetails', WarDetailsSchema);
*/
module.exports = mongoose.model('WarResult', WarResultSchema);
/*module.exports = mongoose.model('WarDetails', WarDetailsSchema);
module.exports = mongoose.model('WarScore', WarScoreSchema);
module.exports = mongoose.model('Map', MapSchema);
module.exports = mongoose.model('PartialScore', PartialScoreSchema);
module.exports = mongoose.model('TeamWarRoster', TeamWarRosterSchema);*/