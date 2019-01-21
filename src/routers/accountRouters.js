const express=require('express');
const path=require('path');
const router=express.Router();
const controllers=require(path.join(__dirname,'../controllers/accountControllers.js'))
router.get('/register',controllers.getRegister);
router.get('/login',controllers.login);
router.get('/vcode',controllers.vcode);
router.post('/register',controllers.register);
router.post('/login',controllers.denlu);
module.exports=router;