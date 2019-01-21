const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
var session = require('express-session')
const app=express();
const accountRouters=require(path.join(__dirname,'routers/accountRouters.js'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 }}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/account',accountRouters)
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('zqj');
})