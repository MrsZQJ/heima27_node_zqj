const express=require('express');
const path=require('path');
const studentControllers=require(path.join(__dirname,'../controllers/studentControllers.js'));
const studentRouters=express.Router();
studentRouters.get('/list',studentControllers.list)
module.exports=studentRouters;