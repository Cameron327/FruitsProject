// jshint esversion:6

const mongoose = require('mongoose');

// this line establishes the connection and then creates the db
// this line replaces the whole client.connect from the drive version
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// create the schema for the collection
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
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

// Fruit.updateOne({_id: "insert_random_id_here"}, {name: "Peach"}, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated!");
//     }
// });

// Fruit.deleteOne({name: "Peach"}, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted!");
//     }
// });


// Person.deleteMany({name: "John"}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted all documents!");
//     }
// });




