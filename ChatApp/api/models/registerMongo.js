var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UserData', { useNewUrlParser: true });
 var registerSchema = mongoose.Schema;

module.exports= userSchema = new registerSchema({

    "firstName": String,
    "lastName": String,
    "emailId": String,
    "gender": String,
    "password": String
});

module.exports = mongoose.model('UserData', userSchema);