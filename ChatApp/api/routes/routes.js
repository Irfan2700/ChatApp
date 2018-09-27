var express= require('express');
var router=express.Router();

// var app = express();
var users=require('../controller/userController')
var authRoute=require('./authRoute');

router.post('/register', users.registration);
router.post('/login',users.login);
// app.use('/', router);


// router.get('/:id/list', users.memberList);
router.use('/auth',authRoute);
//var auth=require('../authentication');

//router.get('/users/:id/userlist',auth, users.memberList);

module.exports=router;