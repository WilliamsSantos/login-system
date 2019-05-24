const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	createdAt: { type: Date, default: Date.now },
	email: String,
	User_id: String
});

const ForgottenPassword = mongoose.model('ForgottenPassword', schema);

module.exports = ForgottenPassword;