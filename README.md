# 🏡 Real Estate Platform

## 📋 Overview
This **Real Estate Platform** simplifies property management for agents and enhances the property search experience for clients. Built with **ReactJS**, **Node.js**, and **MongoDB**, the platform offers secure and scalable features like role-based access, property CRUD operations, and client interest tracking.

---

## 📸 Screenshots
### Login Page
![Login Page](https://via.placeholder.com/800x400)

### Property Listings
![Property Listings](https://via.placeholder.com/800x400)

### Interested Clients (Agent Role)
![Interested Clients](https://via.placeholder.com/800x400)
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

---

## ✨ Features
- **User Authentication**: Secure login using JWT tokens.
- **Role-Based Access Control**: Separate functionality for Agents and Clients:
  - Agents: Create, read, update, and delete properties.
  - Clients: Browse properties and express interest.
- **Property Management**: Easy-to-use property listings for agents.
- **Client Interest Tracking**: Agents can view interested clients.
- **Interactive Map**: Explore property locations with an integrated map.
- **Responsive Design**: Optimized for both mobile and desktop.

---

## 💻 Technologies Used
- **Frontend**: ReactJS, TailwindCSS, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)

---


## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud)
- **NPM** or **Yarn** for package management

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/real-estate-platform.git
    cd real-estate-platform
    ```

2. **Install dependencies**:
    ```bash
    # Server dependencies
    cd server
    npm install

    # Client dependencies
    cd ../client
    npm install
    ```

3. **Configure environment variables**:
    Create a `.env` file in the `server` folder with:
    ```plaintext
    MONGO_URI=mongodb+srv://<your-db-url>
    JWT_SECRET=your-jwt-secret
    PORT=5000
    ```

---

## 📡 API Endpoints

### Auth Routes
- **POST /api/login** - User login
- **POST /api/register** - User registration

### Property Routes
- **GET /api/properties** - Fetch all properties
- **POST /api/properties** - Add a new property (Agent)
- **PUT /api/properties/:id** - Update a property (Agent)
- **DELETE /api/properties/:id** - Delete a property (Agent)

### Interest Routes
- **POST /api/properties/interest/:id** - Express interest in a property (Client)

---

## 🧪 Test Accounts
- **Agent**: 
  - Email: `agent@example.com`
  - Password: `Agent1234`
- **Client**: 
  - Email: `client@example.com`
  - Password: `Client1234`

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact
**Owner**: Om Sharma  
**Email**: [mr.omsharma.c@gmail.com](mailto:mr.omsharma.c@gmail.com)
ng client inquiries and managing potential buyers or sellers.Search & Filtering: Advanced search options for finding properties based on criteria like price, location, and size.

