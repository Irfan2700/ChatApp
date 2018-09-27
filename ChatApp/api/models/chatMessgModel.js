
var mongoose = require('mongoose');

module.exports = chatSchema = {

    'userid': {type: String, required: true},
    'message': {type: String, required: true},
    'dateTime': {type: String, required: true}

}

module.exports = mongoose.model('chatData', chatSchema);