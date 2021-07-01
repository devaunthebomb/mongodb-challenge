const express = require('express');

const app = express();

app.use(express.json());

const MongoClient = require('mongodb');

let db;

var ObjectId = require('mongodb').ObjectID;

const port = 1230;

const uri = "mongodb+srv://Devaun:devsam0613@cluster0.pnxif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(uri, {useUnifiedTopology:true}, function(err,client){
    console.log("connected to mongodb succsefully ");
    db = client.db("MongoDb");
})

app.listen(port, function(req,res){
    console.log("Listening to port " + port);
})

app.get('/getHero', function(req,res){
    db.collection('heros').find({}).toArray(function(error,documents){
        if(error) throw error;
        for(let counter = 0; counter < documents.length; counter++){
            res.write("Name:" + documents[counter].name + " Age: " + documents[counter].age + '\n');
        }
        res.end();
    })
})


app.post('/findHeroByID', function(req,res){
    db.collection('heros').findOne({
        _id: req.body._id
    })
    db.collection('heros').find({"_id" : ObjectId(req.body._id)}).toArray( function(error, documents){
    if (error) throw error;
    console.log(documents)
    res.send(documents)
    })
})

// app.get('/findHeroByID', function(req,res){

//     db.collection('heros').find({"_id" : ObjectId("60dcaa678836ac0a2b963527")}).toArray( function(error, documents){
//         if (error) throw error;
//         console.log(documents)
//     })
// })


// app.get('/findHeroByID', function(req,res){
//     db.collection('heros').find({"_id" : ObjectId("60dc9e8ece18b808f9b20449")}).toArray( function(error, documents){
//     if (error) throw error;
//     console.log(documents)
//     res.send(documents)
//     })
// })


// app.get('/getHeroById', function(req,res){
//     db.collection('heros').find({
//         name: req.body.name,
//         age: req.body.age
//     },function(err,documents){
//         if(err) throw error
//     })
// })

app.post('/customHero', function(req,res){
    db.collection('heros').insertOne({
        name: req.body.name,
        age: req.body.age
    }, function(err,results){
      if(err) throw error;
      res.send("Blog added successfully");
    })
})