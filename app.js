const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware

const categoryRoutes = require('./Routes/categorieRoutes');
const postRoutes = require('./Routes/postRoutes');

const userRoutes = require('./Routes/userRouts'); // Import userRoutes

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogs')
    .then(() => {
        // Routes
        app.use('/api/categories', categoryRoutes);
        app.use('/api/posts', postRoutes);

        app.use('/api/users', userRoutes); //


          
          
        // Start server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
