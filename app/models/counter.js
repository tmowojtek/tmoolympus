'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// add document:  _id:"userid",seq:0
// add document:  _id:"newsid",seq:0

var CounterSchema = new Schema({
	_id: {
		type: String,
		required: true,
		unique: true
	},	
	seq: {
		type: Number,
		required: true,
		unique: true,
		default: 0
	}
});

CounterSchema.statics.generateNextSequence = function(name, callback) {
	console.log('in counter gen seq');
	this.findOneAndUpdate(
		{ _id: name },
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true },
		callback
	);
}

module.exports = mongoose.model('Counter', CounterSchema);