'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');

var RoleSchema = new Schema({
    roleid: {
        type: Number,
        required: true,
        unique: true,
    },
    visibility : {
        type: Number,
        required: true,
        default: 1
    },
    rolename: {
        type: String,
        required: true,
        unique: true
    }
});

RoleSchema.pre('validate', function(callback) {
    var self = this;
    
    Counter.generateNextSequence('roleid', function(err, result) {
        if (err)
            throw err;
        
        console.log('lololo');
        
        self.roleid = result.seq;
        
        callback();
    });
});

module.exports = mongoose.model('Role', RoleSchema);