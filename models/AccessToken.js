const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	createdAt: { type: Date, default: Date.now },
	User_id: String
});

const AccessToken = mongoose.model('AccessToken', schema);

module.exports = AccessToken;