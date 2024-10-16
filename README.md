<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Platform README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f7f7f7;
        }

        h1, h2, h3 {
            color: #2c3e50;
        }

        ul {
            list-style-type: disc;
            margin-left: 20px;
        }

        code {
            background-color: #eaeaea;
            padding: 2px 4px;
            border-radius: 4px;
        }

        .container {
            max-width: 800px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🏡 Real Estate Platform</h1>

        <h2>📋 Overview</h2>
        <p>This <strong>Real Estate Platform</strong> simplifies property management for agents and enhances the property search experience for clients. Built with <strong>ReactJS</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>, the platform offers secure and scalable features like role-based access, property CRUD operations, and client interest tracking.</p>

        <hr>

        <h2>✨ Features</h2>
        <ul>
            <li><strong>User Authentication</strong>: Secure login using JWT tokens.</li>
            <li><strong>Role-Based Access Control</strong>: Separate functionality for Agents and Clients:
                <ul>
                    <li>Agents: Create, read, update, and delete properties.</li>
                    <li>Clients: Browse properties and express interest.</li>
                </ul>
            </li>
            <li><strong>Property Management</strong>: Easy-to-use property listings for agents.</li>
            <li><strong>Client Interest Tracking</strong>: Agents can view interested clients.</li>
            <li><strong>Interactive Map</strong>: Explore property locations with an integrated map.</li>
            <li><strong>Responsive Design</strong>: Optimized for both mobile and desktop.</li>
        </ul>

        <hr>

        <h2>💻 Technologies Used</h2>
        <ul>
            <li><strong>Frontend</strong>: ReactJS, TailwindCSS, Axios, React Router</li>
            <li><strong>Backend</strong>: Node.js, Express.js</li>
            <li><strong>Database</strong>: MongoDB (NoSQL)</li>
            <li><strong>Authentication</strong>: JWT (JSON Web Tokens)</li>
        </ul>

        <hr>

        <h2>🗂 Project Structure</h2>
        <pre>
📁 client                  # Frontend (React)
 └── 📁 src
     └── 📁 components     # Reusable UI components
     └── 📁 assets         # Static images and resources
     └── 📁 pages          # Individual page components
     └── App.js            # Main app component
     └── index.js          # React entry point

📁 server                   # Backend (Node.js)
 └── 📁 controllers        # Express controllers for API logic
 └── 📁 models             # Mongoose models for MongoDB
 └── 📁 routes             # API route handling
 └── server.js             # Server entry point
        </pre>

        <hr>

        <h2>🚀 Getting Started</h2>

        <h3>Prerequisites</h3>
        <ul>
            <li><strong>Node.js</strong> (v14 or higher)</li>
            <li><strong>MongoDB</strong> (local or cloud)</li>
            <li><strong>NPM</strong> or <strong>Yarn</strong> for package management</li>
        </ul>

        <h3>Installation</h3>
        <ol>
            <li><strong>Clone the repository</strong>:
                <pre>
git clone https://github.com/your-username/real-estate-platform.git
cd real-estate-platform
                </pre>
            </li>
            <li><strong>Install dependencies</strong>:
                <pre>
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
                </pre>
            </li>
            <li><strong>Configure environment variables</strong>:
                <p>Create a <code>.env</code> file in the <code>server</code> folder with:</p>
                <pre>
MONGO_URI=mongodb+srv://&lt;your-db-url&gt;
JWT_SECRET=your-jwt-secret
PORT=5000
                </pre>
            </li>
        </ol>

        <hr>

        <h2>📡 API Endpoints</h2>

        <h3>Auth Routes</h3>
        <ul>
            <li><strong>POST /api/login</strong> - User login</li>
            <li><strong>POST /api/register</strong> - User registration</li>
        </ul>

        <h3>Property Routes</h3>
        <ul>
            <li><strong>GET /api/properties</strong> - Fetch all properties</li>
            <li><strong>POST /api/properties</strong> - Add a new property (Agent)</li>
            <li><strong>PUT /api/properties/:id</strong> - Update a property (Agent)</li>
            <li><strong>DELETE /api/properties/:id</strong> - Delete a property (Agent)</li>
        </ul>

        <h3>Interest Routes</h3>
        <ul>
            <li><strong>POST /api/properties/interest/:id</strong> - Express interest in a property (Client)</li>
        </ul>

        <hr>

        <h2>🧪 Test Accounts</h2>
        <ul>
            <li><strong>Agent</strong>: 
                <ul>
                    <li>Email: <code>agent@example.com</code></li>
                    <li>Password: <code>Agent1234</code></li>
                </ul>
            </li>
            <li><strong>Client</strong>: 
                <ul>
                    <li>Email: <code>client@example.com</code></li>
                    <li>Password: <code>Client1234</code></li>
                </ul>
            </li>
        </ul>

        <hr>

        <h2>📸 Screenshots</h2>
        <h3>Login Page</h3>
        <img src="https://via.placeholder.com/800x400" alt="Login Page" />

        <h3>Property Listings</h3>
        <img src="https://via.placeholder.com/800x400" alt="Property Listings" />

        <h3>Interested Clients (Agent Role)</h3>
        <img src="https://via.placeholder.com/800x400" alt="Interested Clients" />

        <hr>

        <h2>📜 License</h2>
        <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

        <hr>

        <h2>📧 Contact</h2>
        <p><strong>Owner</strong>: Om Sharma</p>
        <p><strong>Email</strong>: <a href="mailto:mr.omsharma.c@gmail.com">mr.omsharma.c@gmail.com</a></p>
    </div>
</body>

</html>


# Real-Estate-Agency

(https://real-estate-agency-gqy0.onrender.com)

Real Estate Backend
This is a backend application built with Node.js and Express, designed to manage real estate data for an agency. It provides APIs to manage properties, agents, and clients, supporting features like property listings, searches, and inquiries.

Table of Contents
Prerequisites
Installation
Configuration
Running the Project Locally
Project Structure
API Documentation
About the Real Estate Agency
Prerequisites
Ensure you have the following installed on your machine:

Node.js (v14.x or later)
npm or yarn
MongoDB (or any other database you're using)
Postman (optional, for API testing)
<h2>Media</h2>

![image](https://github.com/user-attachments/assets/10d87d9c-9a17-4cd6-9170-65cee5bdc5d8)
![image](https://github.com/user-attachments/assets/fbf53dec-1411-4079-8bac-c747fcd2da9d)
![image](https://github.com/user-attachments/assets/91d54b6c-9c02-451c-b958-b4327b6c7d87)


![image](https://github.com/user-attachments/assets/acfc0d52-7aa2-412c-ad71-3b80915e17c0)
![image](https://github.com/user-attachments/assets/48cbc8f3-7fc7-4d4c-8396-869b6593c077)
![image](https://github.com/user-attachments/assets/026dcce3-09c8-4643-b9d2-244afc2e906d)

![image](https://github.com/user-attachments/assets/03f81d0e-5276-4636-81f6-7934dc9d11fc)
![image](https://github.com/user-attachments/assets/dcb13de4-bd3a-4573-9076-21dfc38bd435)
![image](https://github.com/user-attachments/assets/4fd712d5-ca29-445f-8716-d7afe40ccd8b)
![image](https://github.com/user-attachments/assets/c7f1ae54-1be6-42ad-89f9-bf871e2e514f)
![image](https://github.com/user-attachments/assets/7f35edc8-5c78-40a3-8425-06b2d9277a01)
![image](https://github.com/user-attachments/assets/c733e2ba-ccd8-4f11-b986-4d7444d607ee)
![image](https://github.com/user-attachments/assets/7b7f4bb5-acc1-49dc-b043-c14b0e26e19e)









<H1>Installation</H1>

Clone the repository:
git clone https://github.com/R0GDEV/real-estate-backend.git

Navigate to the project directory:
cd real-estate-backend

Install dependencies:
npm install

Configuration
Create a .env file in the root directory, and add the following environment variables:
PORT=5000
DB_URI=mongodb://localhost:27017/real-estate-db or //MongoDB Atlas connection string 
JWT_SECRET=your_secret_key

Replace DB_URI with your MongoDB connection string and JWT_SECRET with a secure key.
<h1>Running the Project Locally</h1>

Start your MongoDB instance (if it’s not already running:
mongod 

Run the application:
npm run dev
node server.ts

The backend server should now be running on http://localhost:5000.

Test API endpoints via Postman or any other API client, using the base URL http://localhost:5000.

<h1>About the Real Estate Agency</h1>

This backend is designed for a real estate agency that specializes in connecting property buyers, sellers, and agents. The agency's mission is to provide a seamless experience for property transactions, offering a wide range of property listings and professional agents to assist clients in their property buying or selling journey.

The application supports:

Property Listings: Detailed listings of properties with information such as price, location, and features.Agent Management: A system for managing real estate agents, including their profiles and contact information.Client Management: Handling client inquiries and managing potential buyers or sellers.Search & Filtering: Advanced search options for finding properties based on criteria like price, location, and size.

