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
// Fruit is the name of the collection (Mongoose is smart because it will automatically make it plural)
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Apple",
    rating: 8,
    review: "Great"
});
// fruit.save();


const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 27
});
// person.save();

const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 10,
    review: "Excellent"
});
const orange = new Fruit ({
    name: "orange",
    rating: 8,
    review: "Great"
});
const banana = new Fruit ({
    name: "banana",
    rating: 8,
    review: "Great"
});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Successfully added all fruits to the fruitsDB");
//     }
// });

// the read method that uses a callback function to retrieve the results
Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
        mongoose.connection.close();
    }
});
