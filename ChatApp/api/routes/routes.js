var express= require('express');
var router=express.Router();

var app = express();
var users=require('../controller/userController')
var authRoute=require('./authRoute');

router.post('/register', users.registration);
router.post('/login',users.login);
// app.use('/', router);


router.get('user/:id/list', users.memberList);
// router.use('/auth',authRoute);

module.exports=router;