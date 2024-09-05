const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Initialize the app
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// In-memory user store (dummy data)
const users = [
  // Example user with hashed password
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10) // Password: password123
  }
];

// Secret for JWT (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Helper function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register Route
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user and add to the array
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);

  // Return the user info along with a JWT token
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser.id),
  });
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare entered password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // If login is successful, return the user info and token
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// A protected route (optional, just to show token verification)
app.get('/api/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'This is your profile', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
