import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
