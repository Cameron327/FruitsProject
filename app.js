// jshint esversion:6

const mongoose = require('mongoose');

// this line establishes the connection and then creates the db
// this line replaces the whole client.connect from the drive version
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// create the schema for the collection
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
});

// initialize the documents with the schema structure
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Apple",
    rating: 8,
    review: "Great"
});
fruit.save();



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

