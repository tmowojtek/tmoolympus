'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// add document:  _id:"userid",seq:0
// add document:  _id:"newsid",seq:0

var CounterSchema = new Schema({
	col_name: { // _id previously
		type: String,
		required: true,
		unique: true
	},	
	seq: {
		type: Number,
		required: true,
		default: 0
	}
});

CounterSchema.statics.generateNextSequence = function(name, callback) {
	console.log('in counter gen seq');
	this.findOneAndUpdate(
		{ col_name: name }, // _id previously
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true },
		callback
	);
}

module.exports = mongoose.model('Counter', CounterSchema);