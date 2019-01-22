const path = require('path');
const template = require('art-template');
const databasetool = require(path.join(__dirname, '../tools/databasetool.js'));
exports.list = (req, res) => {
    const keywords = req.query.keywords || '';
    databasetool.find('studentInfo', {
        name: {
            $regex: keywords
        }
    }, (err, docs) => {
        console.log(docs);
        var html = template(path.join(__dirname, '../public/html/list.html'), {
            student: docs,
            keywords
        });
        res.send(html);
    })
}
exports.add = (req, res) => {
    const html = template(path.join(__dirname, '../public/html/add.html'), {});
    // console.log(html);
    res.send(html);
}
exports.add2 = (req, res) => {
    databasetool.insertSingle('studentInfo', req.body, (err, result) => {
        if (!result) {
            res.send(`<script>alert("添加失败!")</script>`)
            return;
        }
        res.send(`<script>location="/studentmanager/list"</script>`)
    })
}
exports.edit = (req, res) => {
    const _id = databasetool.ObjectId(req.params.studyId);
    // console.log(_id);
    // res.send('12345667');
    databasetool.findOne('studentInfo', {
        _id
    }, (err, doc) => {
        console.log(doc);
        const html = template(path.join(__dirname, '../public/html/edit.html'), doc);
        res.send(html);
    })
}
exports.edit2 = (req, res) => {
    const _id = databasetool.ObjectId(req.params.studyId);
    console.log(_id);
    databasetool.updataOne('studentInfo', {
        _id
    }, req.body, (err, result) => {
        if (result.modifiedCount !== 1) {
            res.send('<script>alert("修改失败!")</script>');
        } else {
            res.send('<script>location="/studentmanager/list"</script>');
        }
    })
}
exports.deleteStudent = (req, res) => {
    const _id = databasetool.ObjectId(req.params.studyId);
    console.log(_id);
    databasetool.deleteYige('studentInfo', {_id}, (err, result) => {
        if(!result) {
            res.send(`<script>alert("删除失败!")</script>`);
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`);
            // console.log(11111);
            
        }
    })
}