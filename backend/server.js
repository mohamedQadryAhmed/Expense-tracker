import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
