
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
	username: String,
	password: String,
	email: String,
	emailVerified: Number,
	baptoPatro: String,
	profile: String,
	createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', schema);

module.exports = User;