
const properties = [
  {
    id: "1",
    title: 'Luxury Villa',
    description: 'A beautiful luxury villa with a private pool.',
    price: 1000000,
    location: 'Beverly Hills, CA',
    bedrooms: 5,
    bathrooms: 4,
  },
  {
    id: "2",
    title: 'Modern Apartment',
    description: 'A modern apartment in the city center.',
    price: 500000,
    location: 'New York, NY',
    bedrooms: 3,
    bathrooms: 2,

  },
  {
    id: "3",
    title: 'Cozy Cottage',
    description: 'A cozy cottage in the countryside.',
    price: 250000,
    location: 'Austin, TX',
    bedrooms: 2,
    bathrooms: 1,
  },
];

import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';  // Import CORS
dotenv.config();
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';



// Enable CORS for all origins
const uri = process.env.MONGO_URI || '';
console.log(uri);
const client = new MongoClient(uri, {

  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    // You can perform operations here, or pass `client` to routes to work with collections

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the application if connection fails
  }finally{
    await client.close();
    console.log('Diconnected to MongoDB');
  }
}

// Example of calling MongoDB connection
connectToMongoDB();

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
}



// Initialize the app
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());


/*
const uri = process.env.MONGO_URI || '';
const client = new MongoClient(uri);

// Route to delete a property (or "Notice") by ID
app.delete('/api/properties/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await client.connect(); // Connect to MongoDB

    const db = client.db('DATA_COLLECTION'); // Your database name
    const collection = db.collection('Notice'); // Your collection name

    // Delete the document with the provided ID
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).send('Notice deleted successfully');
    } else {
      res.status(404).send('Notice not found');
    }
  } catch (error) {
    console.error('Error deleting Notice:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close(); // Close the connection to MongoDB
  }
});
*/
const authenticateJWT1 = (req: Request, res: Response, next: NextFunction) => {

  next();

};
app.post('/api/properties', async (req: Request, res: Response) => {
  const {  title, description, price, location, bedrooms, bathrooms,token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
    const data = {
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      owner: decoded.email,      // Property owner's email (extracted from JWT)
      interestedClients: [],     // Array to store interested client emails
    };
    
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    await collection.insertOne(data);
    console.log(data);
    res.status(201).json({ message: 'Property created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  finally {
    await client.close();
  }
});
// In-memory user storage (for demo purposes; replace with a database in real apps)
const users: { id: number; name: string; email: string; password: string }[] = [];

// Secret for JWT (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Helper function to generate a JWT token
const generateToken = (email: string) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
};

// Register Route
app.post('/api/register', async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user and store in-memory (or in a real database)
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);

  // Return user info along with a JWT token
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser.email),
  });
});


app.get('/api/properties', async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    const cursor = collection.find();
    const Properties = await cursor.toArray();
    console.log(Properties);
    res.json(Properties);
  } finally {
    await client.close();
  }
  
});

app.get('/api/properties/myinterest', async (req: Request, res: Response) => {
  res.json(properties);

});
app.post('/api/properties/myproperties', async (req: Request, res: Response) => {
 const {token}=req.body;
 if (!token) {
  return res.status(401).json({ message: 'Authentication token missing' });
}
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
  await client.connect();
  const db = client.db('DATA_COLLECTION');
  const collection = db.collection('Properties');
  const cursor = collection.find({owner:decoded.email });
  const Properties = await cursor.toArray();
 // console.log(Properties);
    res.json(Properties);
} catch (error) {
  res.status(500).json({ message: 'Server error', error });
}
finally {
  await client.close();
}
 

});

async function find(id:string) {
  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    const cursor = collection.find({_id: new ObjectId(id)});
    const Properties = await cursor.toArray();
    return Properties;
  } finally {
    await client.close();
  }
}


app.get('/api/properties/:id', async(req: Request, res: Response) => {

  const { id } = req.params;
  const property =await find(id);
  
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
  console.log(property);
});
/*
app.post('/api/properties', async (req, res) => {
  try {
    const { description } = req.body;
    const notice = {
      description,
      date
    };
    await insertNotice(notice);
    res.redirect("/notices");
  } catch (error) {
    console.error('Error inserting notice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  try {

    const { id } = req.params;
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Notice');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).send('Notice deleted successfully');
    } else {
      res.status(404).send('Notice not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});*/
// Login Route
app.post('/api/login', async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Check if the user exists
  const user = users.find(u => u.email === email) || {
    email: email
  };
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare the entered password with the stored hashed password
 

  // If login is successful, return the user info and JWT token
  res.json({
    email: user.email,
    token: generateToken(user.email),
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
