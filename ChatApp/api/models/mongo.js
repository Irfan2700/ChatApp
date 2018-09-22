var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/UserData', { useNewUrlParser: true });
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
    "userEmail" : String,
    "userPassword" : String
});
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);