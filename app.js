// jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
// everything that you see with assert always has to do with testing
// here, we are using it to validate our connection to the mongodb database
const assert = require ('assert');

// connection url
// this is always the port number
const url = 'mongodb://localhost:27017';

// databse name
const dbName = 'fruitsDB';

// create a new mongo client
// those use things at the end were added in later on because of a depracation error
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
// this mongo client will connect to our mongodb database "fruitsDB". If it doesn't exist, it will create it.

// use connect method to connect to the server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Successfully connected to server");

    const db = client.db(dbName);
    
    // call the insertDocuments function and only close when it's done
    // insertDocuments(db, function() {
    //     client.close();
    // });

    // done with inserting so now we just want to find them
    // call the findDocuments function
    findDocuments(db, function() {
        // then close when done
        client.close();
    });
        
});

// all of the above code is the equivalent of just doing "use fruitsDB" in the mongo shell

// this is like db.fruits.insert but in a function
const insertDocuments = function(db, callback) {
    // get the documents collection
    const collection = db.collection('fruits');
    // insert some documents
    collection.insertMany([
        // each of these are documents
        {
            name: "Apple",
            score: 8,
            review: "Great"
        },
        {
            name: "Orange",
            score: 6,
            review: "Good"
        },
        {
            name: "Banana",
            score: 9,
            review: "Excellent"
        },
    ], function(err, result){
        // this one makes sure that there are no errors after inserting
        assert.equal(err,null);
        // the next 2 makes sure that there are 3 results added into the collection
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

// this function will find the documents from our node.js app
const findDocuments = function(db, callback) {
    // get the documents collection
    const collection = db.collection('fruits');
    // find some documents
    // it's going to find them and then put them into an array
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err,null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
};

