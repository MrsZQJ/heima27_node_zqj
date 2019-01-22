const path = require('path');
var captchapng = require('captchapng');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'heima27';

exports.getRegister = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/register.html'))
}
exports.register = (req, res) => {
    const result = {
        status: 0,
        message: "注册成功"
    };
    const {
        username
    } = req.body;
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        collection.findOne({
            username
        }, (err, doc) => {
            if (doc) {
                result.status = 1;
                result.message = '用户名已注册!';
                res.json(result);
                client.close();
            } else {
                collection.insertOne(req.body, (err, reault2) => {
                    if (!reault2) {
                        result.status = 2;
                        result.message = '注册成功!';
                    }
                    res.json(result);
                    client.close();
                })
            }
        })
    });
};
exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
}
exports.vcode = (req, res) => {
    const num=parseInt(Math.random() * 9000 + 1000);
    req.session.abc=num;
    console.log(num);
    var p = new captchapng(80, 30, num)// width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
exports.denlu=(req,res)=>{
    
}