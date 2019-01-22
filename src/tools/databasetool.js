const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId ;
const path=require('path');
const url = 'mongodb://localhost:27017';
const dbName = 'heima27';
const findOne=(collectionName,data,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.findOne(data,(err,doc)=>{
            callback(err,doc);
            client.close();
        })
    });
}
const find=(collectionName,data,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(data).toArray((err,docs)=>{
            callback(err,docs);
            client.close();
        })
    });
}
const insertSingle=(collectionName,data,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(data,(err,doc)=>{
            callback(err,doc);
            client.close();
        })
    });
}
const updataOne=(collectionName,condition,data,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.updateOne(condition,{$set:data},(err,result)=>{
            callback(err,result);
            client.close();
        })
    });
}
//写一个mongodb连接数据库的函数
const getConnection = (collectionName,callback) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function(err, client) {
        // 拿到db对象
        const db = client.db(dbName);
  
        // 要到要操作的集合 accountInfo
        const collection = db.collection(collectionName);
  
        // 把结果传递出去
        callback(collection,client)
      })
  }
  
  /**
   * 查询多个
   * @param {*} collectionName 集合名称
   * @param {*} data 数据
   * @param {*} callback 回调，把结果告知控制器
   */
  const deleteYige = (collectionName,data,callback) => {
    // 调用我内部封装的一个方法，拿到集合和client
    getConnection(collectionName,(collection,client)=>{
      collection.deleteOne(data,(err,result)=>{
        // 操作完毕之后，关闭数据库，并且把结果传递给控制器
        client.close()
  
        // 执行回调把结果传递给控制器
        callback(err,result)
      })
    })
  }
  
module.exports={
    ObjectId,findOne,insertSingle,find,updataOne,deleteYige
}