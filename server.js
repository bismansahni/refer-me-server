const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Debug log to verify environment variable loading
console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to database
connectDB().then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Add a simple route to respond with "Hello"
app.get('/', (req, res) => {
    res.send('Hello');
});

// Define a basic API route for testing
app.get('/api/test', (req, res) => {
    res.json({ msg: 'API Test Route' });
});

// Define the auth route
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
