import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
dotenv.config();
const uri = process.env.MONGO_URI || '';
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
    //console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the application if connection fails
  } finally {
    await client.close();
    //console.log('Diconnected to MongoDB');
  }
}
// Example of calling MongoDB connection
//connectToMongoDB();
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
//app.use(cors());
app.get('/', (req: Request, res: Response) => {
  console.log("Hello");
  res.send("Hello");

});


app.post('/api/properties', async (req: Request, res: Response) => {
  const { title, description, price, location, bedrooms, bathrooms, token } = req.body;
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
    //console.log(data);
    res.status(201).json({ message: 'Property created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  finally {
    await client.close();
  }
});

app.get('/api/properties', async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    const cursor = collection.find();
    const Properties = await cursor.toArray();
    ////console.log(Properties);
    res.json(Properties);
  } finally {
    await client.close();
  }

});
app.post('/api/properties/myinterest', async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    const cursor = collection.find({ interestedClients: decoded.email });
    const Properties = await cursor.toArray();
    ////console.log(Properties);
    res.json(Properties);
  } finally {
    await client.close();
  }


});
app.post('/api/properties/myproperties', async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
    //console.log(decoded);
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    const cursor = collection.find({ owner: decoded.email });
    const Properties = await cursor.toArray();
    ////console.log(cursor);
    res.json(Properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  finally {
    await client.close();
  }


});
app.post('/api/properties/interest/:id', async (req: Request, res: Response) => {
  const { id } = req.params; // Property ID from URL
  const { token } = req.body; // Interested client's email from request body
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
    // Connect to MongoDB
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    // Find the property by owner email and property ID
    const property = await collection.findOne({ _id: new ObjectId(id) });
    if (!property) {
      return res.status(404).json({ message: 'Property not found or you do not own this property' });
    }
    if (property.interestedClients.includes(decoded.email)) {
      return res.status(400).json({ message: 'Client already showed interest in this property' });
    }
    // console.log(token, property);
    // Add the client's email to the interestedClients array
    const updatedProperty = await collection.updateOne(
      { _id: new ObjectId(id) }, // Find by property ID
      { $addToSet: { interestedClients: decoded.email } } // Add email to interestedClients array, avoiding duplicates
    );
    // Check if the property was updated
    if (updatedProperty.modifiedCount === 1) {
      res.status(200).json({ message: 'Interest registered successfully', property: updatedProperty });
    } else {
      res.status(500).json({ message: 'Failed to update the property' });
    }
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close(); // Ensure the connection to MongoDB is closed
  }
});
app.delete('/api/properties/:id', async (req: Request, res: Response) => {
  const { id } = req.params; // Get property ID from the URL
  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    const property = await collection.findOne({ _id: new ObjectId(id) });

    if (!property) {
      return res.status(404).json({ message: 'Property not found or you do not own this property' });
    }
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Property deleted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to delete the property' });
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close(); // Ensure the MongoDB connection is closed
  }
});
async function find(id: string) {
  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    const cursor = collection.find({ _id: new ObjectId(id) });
    const Properties = await cursor.toArray();
    return Properties;
  } finally {
    await client.close();
  }
}
app.get('/api/properties/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const property = await find(id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
});
app.put('/api/properties/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title,
    description,
    price,
    location,
    bedrooms,
    bathrooms, } = req.body;

  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('Properties');
    // Find and update the property by ID, making sure the owner matches the agent
    const updatedProperty = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Only allow the agent who owns the property to update it
      {
        $set: {
          title,
          description,
          price,
          location,
          bedrooms,
          bathrooms,
        }
      },

    );

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found or you do not own this property' });
    }

    res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Helper function to generate a JWT token
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const generateToken = (email: string, role: string) => {
  return jwt.sign({ email, role }, JWT_SECRET, { expiresIn: '30d' });
};
app.post('/api/register', async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('User');
    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and store in-memory (or in a real database)
    const newUser = { email, password: hashedPassword, role, };
    const user = await collection.insertOne(newUser);
    // Return user info along with a JWT token
    res.status(201).json({
      email: newUser.email,

      token: generateToken(newUser.email, newUser.role),
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error.' });
  } finally {
    await client.close();
  }
});
// Login Route
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    await client.connect();
    const db = client.db('DATA_COLLECTION');
    const collection = db.collection('User');
    // Check if user exists
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // Create a JWT token
    const token = generateToken(user.email, user.role)
    res.status(200).json({ token, role: user.role, message: 'Login successful!' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
