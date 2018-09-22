var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var router = require('./api/routes/routes')
app.use('/', router);
app.use(express.static('./public'));


app.listen(4100);
console.log("Listening to PORT 4100");