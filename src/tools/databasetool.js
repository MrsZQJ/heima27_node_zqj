const MongoClient = require('mongodb').MongoClient;
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
module.exports={
    findOne,insertSingle,find,
}