
// Edit the exercises in the exercises folder.
// Run this file to execute all three exercises at once.


// Set up connection to Mongo
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost");

// Set up Checkout
var CheckoutSchema = require('./Checkout.schema.js');
var Checkout = mongoose.model("Checkout", CheckoutSchema);

// Set up Movie
var MovieSchema = require('./Movie.schema.js');
var Movie = mongoose.model("Movie", MovieSchema);

// Load Exercises
var example = require('./exercises/example.js');
var exerciseOne = require('./exercises/one.js');
var exerciseTwo = require('./exercises/two.js');
var exerciseThree = require('./exercises/three.js');

// Run Exercises
example(mongoose, Checkout, Movie);
exerciseOne(mongoose, Checkout, Movie);
exerciseTwo(mongoose, Checkout, Movie);
exerciseThree(mongoose, Checkout, Movie);
