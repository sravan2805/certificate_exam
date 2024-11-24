import User from '../models/User.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Log the received request body
  console.log('Request body:', req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Save new user
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import bcrypt from 'bcrypt';

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set user session
    req.session.user = { id: user._id, name: user.name };
    res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Logout Controller
export const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to log out' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.json({ message: 'Logout successful' });
  });
};
