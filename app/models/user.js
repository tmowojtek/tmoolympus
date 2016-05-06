'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
//var Counter = mongoose.model('Counter');

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
	tagLowercase: {
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
	createdAt: {
		type: Date,
		default: Date.now
	}, 
	roleId: {
		type: Number,
		required: true,
		default: 1
	}
});

// finding next userid sequence
/*UserSchema.methods.getNextUserIdSequence = function() {
	var user = this;
	console.log('user: ' + user);
	Counter.generateNextSequence('userid', function(err, result) {
		console.log('in callback');
		console.log('user: ' + user);
		if (err) throw err;
		console.log('result: ' + result);
		//user.userid = result.seq;
		//console.log('userid: ' + user.userid);
	});
};*/
/*
UserSchema.pre('save', function(callback) {
	console.log('in pre-save function');
	//var user = this;
	//user.userid = user.getNextUserIdSequence();
	callback();
});
*/
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.pw);
};

module.exports = mongoose.model('User', UserSchema);