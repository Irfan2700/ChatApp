var express= require('express');
var router=express.Router();
var app = express();
var users=require('../controller/userController')

router.post('/register', users.registration);
router.post('/login',users.login);
app.use('/', router);

module.exports=router;