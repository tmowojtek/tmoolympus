'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');
var Role = mongoose.model('Role');

var UserSchema = new Schema({
	userid: {
		type: Number,
		required: true,
		unique: true
	},
	tag: {
		type: String,
		required: true,
		unique: true
	},
	taglowercase: {
		type: String,
		required: true,
		unique: true
	},
	pw: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	active: {
		type: Boolean,
		default: true
	},
	createdat: {
		type: Date,
		default: Date.now
	}, 
	_roleid: [{
		type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
	}]
});

UserSchema.pre('validate', function(callback) {
	var self = this;
    
    Counter.generateNextSequence('userid', function(err, result) {
        if (err)
            throw err;
        
        self.userid = result.seq;
        
        console.log('self: ' + self);
        
        Role.findOne({ roleid: 1 }, function(err2, role) {
            if (err2) 
                throw err2;
            
            self._roleid.push(role._id);
            
            console.log('self2: ' + self);
            
            callback(); 
        });
    });
});

// generating a hash
UserSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.pw);
};

module.exports = mongoose.model('User', UserSchema);