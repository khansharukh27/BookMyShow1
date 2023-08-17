// Import the 'mongodb' library
const mongodb = require('mongodb');

// Get the port from environment variables
const port = process.env.PORT ||8080;

// Get the MongoDB URI from environment variables
const mongoURI = process.env.mongoURI;

// Import the 'mongoose' library
let mongoose = require('mongoose');

// Import the 'bookMovieSchema' from './schema' (assuming it's a separate file)
const { bookMovieSchema } = require('./schema');

// Connect to the MongoDB server using the provided URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //its debuging : connection connect then this show in console 
    console.log("Connection established with MongoDB server online");
  })
  .catch(err => {
    //its debuging : connection is not connect then  error  show in console 
    console.error("Error while connecting to MongoDB:", err);
  });

// Create a Mongoose model based on the 'bookMovieSchema'
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema);

// Export the created Mongoose model for external use
exports.connection = collection_connection;
