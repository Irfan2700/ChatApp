/**
 * 
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const io = require('socket.io')(server)
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

io.on('connection', function(socket){
    console.log('made socket connection');

    socket.username = "Anonymous";

    socket.on('change_username', function(data) {

        socket.username = data.username
    })

    socket.on('new_message', function(data){

        io.sockets.emit('new_message', {message : data.message, username: socket.username});
    })

    socket.on('typing', function(data){

        socket.broadcast.emit('typing', {username: socket.username})
    })
})