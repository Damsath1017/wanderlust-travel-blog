const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/subscribe', require('./routes/subscribers'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Wanderlust Backend API is running! 🚀' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
