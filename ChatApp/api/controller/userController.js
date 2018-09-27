/**
 * 
 */
var usermod = require('../models/registerMongo');
var jwt = require('jsonwebtoken');
var config = require('./config.json');

var config = require('./config.json');
const secret = config.secret;
// var eStore;


//encrypt the user input password
function encrypt(pass) {
    var encryPass = require('crypto')
        .createHash('sha1')
        .update(pass)
        .digest('base64');
    return encryPass;
}

exports.registration = function (req, res) {

    var response = {};
    var mail = req.body.email;

    var str = /^\S+$/;

    if (!(str.test(req.body.firstName) && str.test(req.body.lastName) &&
            str.test(req.body.password))) {
        var response = {
            "Success": false,
            "message": "Some input is blank.. Please enter the Credentials again .."
        };
        return res.status(400).send(response);
    }

    // if (!((req.body.gender === 'male') || (req.body.gender === 'female') || (req.body.gender === 'other'))) {
    //     var response = {
    //         "Success": false,
    //         "message": "Gender input is Incorrect.. Please enter male, female or other.."
    //     };
    //     return res.status(404).send(response);
    // }

    var n = /^[0-9]*$/;

    if (!(n.test(req.body.mobile)) && (req.body.mobile).length < 10) {

        var response = {
            "Success": false,
            "message": "10-digit Mobile Number is required ... "
        }
    }

    var re = /\S+@\S+\.\S+/;

    if (!(re.test(req.body.email))) {
        var response = {
            "Success": false,
            "message": "Email is Required in Correct format..."
        };
        return res.status(400).send(response);
    }

    var db = new usermod();


    db.emailId = req.body.email;
    // Hash the password using SHA1 algorithm.
    db.password = encrypt(req.body.password);
    db.firstName = req.body.firstName;
    db.lastName = req.body.lastName;
    db.mobile = req.body.mobile;

    usermod.find({
        "emailId": mail,
        "mobile": req.body.mobile
    }, function (err, data) {

        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(400).send(response);
        } else {
            if (data.length > 0) {

                var response = {
                    "Success": false,
                    "message": "Login credentials already Exist!!",
                };
                return res.status(400).send(response);
            } else {
                db.save(function (err) {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err) {
                        response = {
                            "Success": false,
                            "message": "Error adding data",
                            "err": err
                        };
                    } else {
                        response = {
                            "Success": true,
                            "message": "Successfully Registed"
                        };
                    }
                    return res.status(200).send(response);
                });
            }
        }
    })


}


//logic api controller logic

exports.login = function (req, res) {
    var mail = req.body.email;
    var pass = encrypt(req.body.password);
    var response = {};
    console.log(mail);

    //empty input validation
    var str = /^\S+$/;

    if (!(str.test(req.body.password))) {
        var response = {
            "Success": false,
            "message": "Invalid Password"
        };
        return res.status(404).send(response);
    }

    //email formate validation
    var re = /\S+@\S+\.\S+/;
    if (!(re.test(req.body.email))) {
        response = {
            "Success": false,
            "message": "Email is Required.."
        };
        return res.status(404).send(response);
    }

    usermod.find({

        "emailId": mail,
        "password": pass

    }, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(404).send(response);
        } else {
            if (data.length > 0) {

                

                var token = jwt.sign({
                    emailId: mail,
                    password: pass
                
                }, secret, {
                    expiresIn: '12d'
                })
                // var db = new usermod();
                var userid = data[0]._id;
                // console.log(db._id);
                var response = {
                    "Success": true,
                    "message": "login sucessful",
                    "token": token,
                    "userid": userid
                };
                return res.status(200).send(response);
            } else {
                var response = {
                    "Success": true,
                    "message": "Invalid credentials"
                };
                return res.status(401).send(response);
            }
        }

    });
}

exports.memberList = function (req, res) {

    var userid = req.params.id;
    
    var response = {};
    var arrList = [];
    var respo = {};
    usermod.find({
        "_id": {
            $ne: (userid)
        }
    }, function (err, data) {

        if (err) {
            response = {
                "message": "Error fetching data"
            }
        } else {
            response = {
                "message": data
            };
        }
        if(response.message.length)
        for (var i = 0; i < response.message.length; i++) {
            arrList.push({

                username: response.message[i].firstName + ' ' + response.message[i].lastName,
                userid: response.message[i]._id
            });
        }
        respo = {
            "data": arrList
        }
        return res.status(200).json(respo);
    });

}

exports.dashboard = function (req, res) {

    

}


exports.messageSend = function (req, res) {


}