var express= require('express');
var router=express.Router();

var users=require('../controller/userController');
var auth=require('../authentication');

router.get('/users/:id/userlist',auth, users.memberList);
// router.get('/dashboard',auth,users.dashboard);
// router.post('/message/send',auth,users.messageSend);

module.exports = router;