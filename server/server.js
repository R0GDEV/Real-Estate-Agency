"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const uri = process.env.MONGO_URI || '';
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            //console.log('Connected to MongoDB');
        }
        catch (error) {
            console.error('Failed to connect to MongoDB', error);
            process.exit(1); // Exit the application if connection fails
        }
        finally {
            yield client.close();
            //console.log('Diconnected to MongoDB');
        }
    });
}
// Example of calling MongoDB connection
//connectToMongoDB();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON requests
app.use((0, cors_1.default)());
app.post('/api/properties', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, location, bedrooms, bathrooms, token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const data = {
            title,
            description,
            price,
            location,
            bedrooms,
            bathrooms,
            owner: decoded.email, // Property owner's email (extracted from JWT)
            interestedClients: [], // Array to store interested client emails
        };
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('Properties');
        yield collection.insertOne(data);
        //console.log(data);
        res.status(201).json({ message: 'Property created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
    finally {
        yield client.close();
    }
}));
app.get('/api/properties', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('Properties');
        const cursor = collection.find();
        const Properties = yield cursor.toArray();
        ////console.log(Properties);
        res.json(Properties);
    }
    finally {
        yield client.close();
    }
}));
app.post('/api/properties/myinterest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('Properties');
        const cursor = collection.find({ interestedClients: decoded.email });
        const Properties = yield cursor.toArray();
        ////console.log(Properties);
        res.json(Properties);
    }
    finally {
        yield client.close();
    }
}));
app.post('/api/properties/myproperties', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        //console.log(decoded);
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('Properties');
        const cursor = collection.find({ owner: decoded.email });
        const Properties = yield cursor.toArray();
        ////console.log(cursor);
        res.json(Properties);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
    finally {
        yield client.close();
    }
}));
app.post('/api/properties/interest/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Property ID from URL
    const { token } = req.body; // Interested client's email from request body
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        // Connect to MongoDB
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('Properties');
        // Find the property by owner email and property ID
        const property = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!property) {
            return res.status(404).json({ message: 'Property not found or you do not own this property' });
        }
        if (property.interestedClients.includes(decoded.email)) {
            return res.status(400).json({ message: 'Client already showed interest in this property' });
        }
        // console.log(token, property);
        // Add the client's email to the interestedClients array
        const updatedProperty = yield collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, // Find by property ID
        { $addToSet: { interestedClients: decoded.email } } // Add email to interestedClients array, avoiding duplicates
        );
        // Check if the property was updated
        if (updatedProperty.modifiedCount === 1) {
            res.status(200).json({ message: 'Interest registered successfully', property: updatedProperty });
        }
        else {
            res.status(500).json({ message: 'Failed to update the property' });
        }
    }
    catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Server error' });
    }
    finally {
        yield client.close(); // Ensure the connection to MongoDB is closed
    }
}));
app.delete('/api/properties/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get property ID from the URL
    try {
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('Properties');
        const property = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!property) {
            return res.status(404).json({ message: 'Property not found or you do not own this property' });
        }
        const result = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Property deleted successfully' });
        }
        else {
            res.status(500).json({ message: 'Failed to delete the property' });
        }
    }
    catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Server error' });
    }
    finally {
        yield client.close(); // Ensure the MongoDB connection is closed
    }
}));
function find(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db('DATA_COLLECTION');
            const collection = db.collection('Properties');
            const cursor = collection.find({ _id: new mongodb_1.ObjectId(id) });
            const Properties = yield cursor.toArray();
            return Properties;
        }
        finally {
            yield client.close();
        }
    });
}
app.get('/api/properties/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const property = yield find(id);
    if (property) {
        res.json(property);
    }
    else {
        res.status(404).json({ message: 'Property not found' });
    }
}));
app.put('/api/properties/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, price, location, bedrooms, bathrooms, } = req.body;
    try {
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('Properties');
        // Find and update the property by ID, making sure the owner matches the agent
        const updatedProperty = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, // Only allow the agent who owns the property to update it
        {
            $set: {
                title,
                description,
                price,
                location,
                bedrooms,
                bathrooms,
            }
        });
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found or you do not own this property' });
        }
        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
    }
    catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// Helper function to generate a JWT token
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const generateToken = (email, role) => {
    return jsonwebtoken_1.default.sign({ email, role }, JWT_SECRET, { expiresIn: '30d' });
};
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('User');
        // Check if user already exists
        const existingUser = yield collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create a new user and store in-memory (or in a real database)
        const newUser = { email, password: hashedPassword, role, };
        const user = yield collection.insertOne(newUser);
        // Return user info along with a JWT token
        res.status(201).json({
            email: newUser.email,
            token: generateToken(newUser.email, newUser.role),
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
    finally {
        yield client.close();
    }
}));
// Login Route
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        yield client.connect();
        const db = client.db('DATA_COLLECTION');
        const collection = db.collection('User');
        // Check if user exists
        const user = yield collection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        // Check if password matches
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        // Create a JWT token
        const token = generateToken(user.email, user.role);
        res.status(200).json({ token, role: user.role, message: 'Login successful!' });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error.' });
    }
}));
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
