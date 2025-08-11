import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { success, fail, error } from '../utils/formatResponse.js';
import { generateToken } from '../utils/token.js';

// Register a new user
export const register = async (req, res) => {
  try {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json(fail({ message: 'Please fill all fields' }));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(fail({ message: 'User already exists' }));
    }

    // Create a new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // Add token to cookie
    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    res.status(201).json(success(user));
  } catch (e) {
    // console.error(e);
    res.status(500).json(error({ message: 'Server error', error: e.message }));
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(fail({ message: 'Please fill all fields' }));
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(fail({ message: 'Invalid Email' }));
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json(fail({ message: 'Invalid Password' }));
    }

    // Add token to cookie
    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    res.status(200).json(success(user));
  } catch (e) {
    console.log(e);

    res.status(500).json(error({ message: 'Server error', error: e.message }));
  }
};

// Logout a user
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json(success({ message: 'Logged out successfully' }));
  } catch (e) {
    // console.log(e);
    res.status(500).json(error({ message: 'Server error', error: e.message }));
  }
};

// Get user information
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json(fail({ message: 'User not found' }));
    }
    res.status(200).json(success(user));
  } catch (e) {
    // console.log(e);
    res.status(500).json(error({ message: 'Server error', error: e.message }));
  }
};
