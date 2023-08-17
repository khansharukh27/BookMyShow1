// Import required modules
const moment = require('moment-timezone'); // Import the 'moment-timezone' library for handling timezones
const { createLogger, transports, format } = require('winston'); // Import winston's createLogger, transports, and format modules
const { MongoClient } = require('mongodb'); // Import MongoClient from the 'mongodb' library
const winstonMongoDB = require('winston-mongodb'); // Import the 'winston-mongodb' transport for winston

// Define the Indian Standard Time (IST) time zone
const indianTimezone = 'Asia/Kolkata';

// Create a new instance of the MongoClient using the provided MongoDB URI
const mongoClient = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to initialize and return the logger
async function initializeLogger() {
    try {
        // Connect to MongoDB using the client
        await mongoClient.connect();
        console.log('Connected to MongoDB');

        // Create a logger instance with transports for both files and MongoDB
        const logger = createLogger({
            transports: [
                // Log to a file
                new transports.File({
                    filename: 'info.log', // Specify the file name
                    level: 'info', // Log level (info)
                    format: format.combine(
                        format.timestamp({
                            format: () => moment().tz(indianTimezone).format('YYYY-MM-DD HH:mm:ss') // Add timestamp in IST format
                        }),
                        format.json() // Log in JSON format
                    )
                }),
                // Log to MongoDB
                new transports.MongoDB({
                    level: 'error', // Log only errors to MongoDB
                    db: mongoClient.db('movie'), // MongoDB database instance (replace with actual database name)
                    collection: 'usersData', // MongoDB collection (replace with actual collection name)
                    format: format.combine(
                        format.timestamp({
                            format: () => moment().tz(indianTimezone).format('YYYY-MM-DD HH:mm:ss') // Add timestamp in IST format
                        }),
                        format.json() // Log in JSON format
                    )
                })
            ]
        });

        return logger;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error); // Log error message
        throw error;
    }
}

// Export a promise that resolves to the logger
module.exports = initializeLogger().then(logger => {
    return logger; // Return the resolved logger
});
