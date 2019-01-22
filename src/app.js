const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var session = require('express-session')
const app = express();
const accountRouters = require(path.join(__dirname, 'routers/accountRouters.js'));
const studentRouters = require(path.join(__dirname, 'routers/studentRouters.js'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 6000000,
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.all('/*', (req, res, next) => {
    if (req.url.includes('account')) {
        next();
    } else {
        if (req.session.loginedName) {
            next()
        } else {
            res.send(`<script>alert('您还没有登录，请先登录!');location.href='/account/login'</script>`)
        }
    }
})
app.use('/account', accountRouters);
app.use('/studentmanager', studentRouters)
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err);
    }
    console.log('zqj');
})