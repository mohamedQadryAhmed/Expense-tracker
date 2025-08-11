import express from 'express';
import {
  register,
  login,
  logout,
  getUserInfo,
} from '../controllers/userControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout', protect, logout);

// Route for get user info
router.get('/user', protect, getUserInfo);

export default router;
