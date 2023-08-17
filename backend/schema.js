// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Define the schema for booking movie tickets
const bookMovieSchema = new mongoose.Schema({
  // Define the "movie" property with an object schema
  movie: {
    type: "object", // Set the type as "object"
    properties: {
      name: { type: "string" }, // Define "name" property as string
      image: { type: "string" }, // Define "image" property as string
      description: { type: "string" }, // Define "description" property as string
    },
    required: ["name", "image", "description"] // Specify required properties
  },
  
  // Define the "timeSlot" property as a string
  timeSlot: String,
  
  // Define the "seat" property as an object type
  seat: {
    type: Object, // Set the type as "object"
    // required: true // You can specify "required" if needed
  }
});

// Export the mongoose model using the defined schema
module.exports = mongoose.model('bookmovietickets', bookMovieSchema);
