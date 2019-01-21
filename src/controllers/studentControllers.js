const path=require('path');
const template=require('art-template');
const databasetool=require(path.join(__dirname,'../tools/databasetool.js'));
exports.list=(req,res)=>{
    const keywords=req.query.keywords||'';
    databasetool.find('studentInfo',{name:{$regex:keywords}},(err,docs)=>{
        var html=template(path.join(__dirname,'../public/html/list.html'),{student:docs,keywords});
        res.send(html);
    })
}