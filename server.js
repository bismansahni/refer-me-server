// const express = require('express');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');
// const auth = require('./middleware/auth');


// dotenv.config();


// console.log('MONGO_URI:', process.env.MONGO_URI);


// connectDB();

// const app = express();


// app.use(express.json());
// app.use(cors());


// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/referrals', require('./routes/referrals'));
// app.use('/api/users', require('./routes/users'));


// app.get('/api/protected', auth, (req, res) => {
//     res.json({ msg: 'You have accessed a protected route', user: req.user });
// });


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../client/build/index.html'));
//     });
// }


// app.get('/', (req, res) => {
//     res.send('Hello');
// });

// const PORT = process.env.PORT || 3010;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// module.exports = app;





// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Add a simple route to respond with "Hello"
// app.get('/', (req, res) => {
//     res.send('Hello');
// });

// // Define a basic API route for testing
// app.get('/api/test', (req, res) => {
//     res.json({ msg: 'API Test Route' });
// });

// const PORT = process.env.PORT || 3010;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// module.exports = app;



const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');

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

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/referrals', require('./routes/referrals'));
app.use('/api/users', require('./routes/users'));

// Define protected route using the auth middleware
app.get('/api/protected', auth, (req, res) => {
    res.json({ msg: 'You have accessed a protected route', user: req.user });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

// Add a route to respond with "Hello"
app.get('/', (req, res) => {
    res.send('Hello');
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
