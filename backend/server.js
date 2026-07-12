require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start server first so the API is available even if MongoDB is down
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

// Note: No database is required for the current minimal API. If you add DB models later,
// re-enable mongoose and a proper connection here. For now skip DB connection to keep
// the API responsive when MongoDB isn't available.
