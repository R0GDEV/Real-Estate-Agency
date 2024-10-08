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

