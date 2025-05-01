const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Use the environment variable

// Signup logic
const signup = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};



// Login logic
// Login logic
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Fixed Admin Login
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const token = jwt.sign({ userId: 'admin', isAdmin: true }, JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token, isAdmin: true }); // <--- IMPORTANT
      }
  
      // Regular user login
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ token, isAdmin: user.isAdmin }); // <--- IMPORTANT
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
  };
  

module.exports = { signup, login };
