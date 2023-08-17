// Import required modules
const dotenv = require('dotenv'); // Load environment variables from .env file
dotenv.config(); // Initialize dotenv configuration
const loggerPromise = require("./logger"); // Import a promise that resolves to a logger instance
const express = require("express"); // Import the Express framework

// Create an Express app instance
const app = express();

// Import necessary middleware
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const winston = require('winston'); // Logging library
const { connection } = require("./connector"); // Import a MongoDB connection
const cors = require('cors'); // Middleware for enabling CORS
let schema = require("./schema"); // Import a schema definition

// Configure app to use middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Parse JSON bodies (alternative)
app.use(cors()); // Enable CORS

// Define the logger here to make it accessible globally
let logger;

// Wait for the loggerPromise to resolve before starting the server
loggerPromise.then(loggerInstance => {
  logger = loggerInstance; // Assign the resolved logger instance
})

// Define routes

// Endpoint for creating a new booking
app.post("/api/booking", async (req, resp) => {
  const requestData = req.body; // Extract data from the request body
  let newSchema = new schema(requestData); // Create a new schema instance
  try {
    let result = await newSchema.save(); // Save the schema instance to the database
    console.log("status code 200 on successful booking")
    logger.info('Last data of database:', { data: result }); // Log successful booking with a timestamp
    resp.status(200).json(result); // Respond with the saved data
    console.log(result)
  } catch (error) {
    logger.error('Failed to save booking data:', { error }); // Log failed booking with a timestamp
    resp.status(500).json({ error: "Failed to save booking data" }); // Respond with an error message
  }
});

// Endpoint for retrieving booking data
app.get("/api/booking", async (req, res) => {
  try {
    const data = await schema.findOne().sort({ _id: -1 }); // Find the latest booking data
    logger.info('Last data of database:', { data }); // Log retrieved data with a timestamp
    res.status(200).json({ data }); // Respond with the retrieved data
  } catch (error) {
    logger.error('Failed to retrieve data:', { error }); // Log failed data retrieval with a timestamp
    res.status(500).json({ error: "Failed to retrieve data" }); // Respond with an error message
  }
});

// Get the port from environment variables
const port = process.env.PORT || 8080;


if (process.env.NODE_ENV === "production") {
  // Check if the application is in production mode
  // In production mode, we serve the static files from the build directory

  app.use(express.static("backend/build"));
  // Use Express middleware to serve static files from the "backend/build" directory
  // These static files could include compiled JavaScript, CSS, images, etc.

  const path = require("path");
  // Import the "path" module from Node.js
  // The "path" module provides utilities for working with file and directory paths

  app.get("*", (req, res) => {
    // Define a route handler for all routes ("*")

    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // Send the "index.html" file from the "client/build" directory
    // This is a common pattern in Single Page Applications (SPAs)
    // The "index.html" file acts as the entry point for the frontend application
    // "path.resolve" is used to construct the absolute path to the file
    // "__dirname" represents the current directory
  });
}

// Start the Express app
app.listen(port, () => {
  // Define a loggerFunction that logs messages
  async function loggerFunction() {
    const logger = await loggerPromise; // Resolve the logger promise
    logger.info('This is an informational log message.'); // Log an informational message
    logger.error(`App listening on port ${port}!`); // Log the app's port number with a timestamp
  }

  // Call the loggerFunction to log messages
  loggerFunction();
});

// Export the app for use in other modules
module.exports = app;
