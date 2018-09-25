var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var socket = require('socket.io');
//var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/UserData', { useNewUrlParser: true });

var router = require('./api/routes/routes')
app.use('/', router);
app.use(express.static('./public'));

var server = app.listen(4100);
console.log("Listening to PORT 4100");

var io = socket(server);
io.on('connection', function(socket){
    console.log('made socket connection');
})