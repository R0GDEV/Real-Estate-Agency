const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

// Initialize the app
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Dummy in-memory data
const users = [];
const properties = [];

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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user and push to the array (in real apps, save to DB)
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

// Get all properties
app.get('/api/properties', (req, res) => {
  res.json(properties);
});

// Create a property
app.post('/api/properties', (req, res) => {
  const { title, description, price, location } = req.body;

  const newProperty = { id: properties.length + 1, title, description, price, location };
  properties.push(newProperty);

  res.status(201).json(newProperty);
});

// Update a property
app.put('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, price, location } = req.body;

  const property = properties.find(p => p.id === parseInt(id));
  if (!property) {
    return res.status(404).json({ message: 'Property not found' });
  }

  property.title = title || property.title;
  property.description = description || property.description;
  property.price = price || property.price;
  property.location = location || property.location;

  res.json(property);
});

// Delete a property
app.delete('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  const index = properties.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Property not found' });
  }

  properties.splice(index, 1);
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
