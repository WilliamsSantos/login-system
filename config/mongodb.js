const mongoose    = require('mongoose'); 
const mongodbUrl  = 'mongodb+srv://admin:sjkodfn34jks44@login-system-tieis.mongodb.net/test?retryWrites=true';

mongoose.connect(mongodbUrl, { useNewUrlParser: true });


module.exports = mongoose
