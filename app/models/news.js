'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment');

var NewsSchema = new Schema({
	newsid: {
		type: Number,
		required: true
	},
	authorid: {
		type: Number,
		required: true
	},
	visibility: { // whose users (roleid) can see the news
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	pictureSrc: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	comments: [ Comment.schema ]
});

module.exports = mongoose.model('News', NewsSchema);