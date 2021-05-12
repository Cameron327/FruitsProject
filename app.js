// jshint esversion:6

const mongoose = require('mongoose');

// this line establishes the connection and then creates the db
// this line replaces the whole client.connect from the drive version
mongoose.connect("mongodb://localhost:27017/fruitsDB")


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

