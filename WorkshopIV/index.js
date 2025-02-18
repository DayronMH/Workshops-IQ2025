require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS for cross-origin requests

// Load environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DATABASE_URL;

// Check if the database URL is set
if (!MONGO_URI) {
    console.error("❌ DATABASE_URL is not defined in .env");
    process.exit(1); // Stop execution if no database URL is provided
}

// Connect to MongoDB and then start the server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Database Connected');

        // Start the server only if the database connection is successful
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('❌ Database Connection Error:', error);
        process.exit(1); // Stop execution if the database connection fails
    });

// Routes
app.use('/api', routes); // Mount API routes under /api endpoint
