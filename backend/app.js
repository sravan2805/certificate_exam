import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use the session secret from .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 },
  })
);

// MongoDB connection
mongoose.connect(process.env.DBCONNECT)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use project routes
app.use('/api/projects', projectRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Portfolio Builder API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
