/**
 * 
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const Socket = require('socket.io')
var users = require('./api/controller/userController');
//var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UserData', { useNewUrlParser: true });

var router = require('./api/routes/routes')
app.use('/', router);
app.use(express.static('./public'));

var server = app.listen(4100);
console.log("Listening to PORT 4100");

var io = Socket(server);

io.on('connection', function(client){

    console.log('A user enter in the room');

    client.on('disconnect', function(){
        console.log("socket disconnected ")
    })


    client.on('chatRoomBackend', function(data) {
               
       users.chatAddHistory(data.userid, data.username, data.message, data.dateTime);
        
       // console.log(chathistory);
        io.emit('chatroomClient', data);
        // client.broadcast.emit('chatroomClient', data);
    })
});