import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
// server.js
import express from 'express';

import connectDB from './config/db.js';
import UserRoute from './routes/userRoutes.js';

config();
connectDB();

const app = express();

// ----- MIDDLEWARE -----
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// ----- ROUTES -----


// Root route
// app.get('/', (req, res) => {
//   res.json({ message: 'API is running…' });
// });
app.use('/api/users', UserRoute);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
