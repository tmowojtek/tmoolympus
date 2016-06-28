'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');

var NewsCategorySchema = new Schema({
    categoryid: {
        type: Number
        , required: true
        , unique: true
    }
    , categoryname: {
        type: String
        , required: true
        , unique: true
    }
    , picturesrc: {
        type: String
    }
});

NewsCategorySchema.pre('validate', function (callback) {
    var self = this;

    Counter.generateNextSequence('newscategoryid', function (err, result) {
        if (err)
            throw err;

        console.log('categoryid inc');

        self.categoryid = result.seq;

        callback();
    });
});

module.exports = mongoose.model('NewsCategory', NewsCategorySchema);