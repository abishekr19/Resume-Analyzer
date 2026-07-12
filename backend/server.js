require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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

// Database Connection
// Note: modern mongoose/mongodb drivers no longer accept `useNewUrlParser` and `useUnifiedTopology` options.
// Add a short serverSelectionTimeoutMS to fail fast if MongoDB isn't available in development.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-resume-analyzer', {
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));
