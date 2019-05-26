const mongoose    = require('mongoose'); 
//const mongodbUrl  = 'mongodb+srv://admin:sjkodfn34jks44@login-system-tieis.mongodb.net/test?retryWrites=true';
const mongodbUrl = "mongodb+srv://giryco:GiRyCo@2019QD@moderatoro-uo7is.gcp.mongodb.net/moderatoro?retryWrites=true";

mongoose.connect(mongodbUrl, { useNewUrlParser: true });

module.exports = mongoose;