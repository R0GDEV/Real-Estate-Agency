# 🏡 Real Estate Platform

## 📋 Overview
This **Real Estate Platform** simplifies property management for agents and enhances the property search experience for clients. Built with **ReactJS**, **Node.js**, and **MongoDB**, the platform offers secure and scalable features like role-based access, property CRUD operations, and client interest tracking.

---

<div style="text-align:center;margin:auto;"> ![image](https://github.com/user-attachments/assets/a913e87d-b058-46e5-9989-aa1766c056b6)
</div>

## 📸 Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/9475895b-2003-4eb9-9e19-0906ba6ca2cf)
![image](https://github.com/user-attachments/assets/fbf53dec-1411-4079-8bac-c747fcd2da9d)
![image](https://github.com/user-attachments/assets/91d54b6c-9c02-451c-b958-b4327b6c7d87)
The home page offers a seamless introduction to the platform, featuring a clean UI for easy navigation to various sections like properties, map view, and user accounts.

### Login Page
![Login Page](https://github.com/user-attachments/assets/60476c37-e451-4a0e-9991-18cfbf98e3f1)
The login page allows users to securely access the platform using their email and password. It includes JWT-based authentication for secure access.

### Register Page
![Register Page](https://github.com/user-attachments/assets/fd986b34-502e-44a8-99a8-114ad85908fb)


New users can register on the platform by filling in their details such as email, password, and role (Agent or Client). The form validates user input for a smooth registration process.

### Property Listings
![Property Listings]![image](https://github.com/user-attachments/assets/6c80b77b-c9e5-44cb-898b-e907ef8f09bb)
This page displays all the available properties. Clients can browse through property listings, and agents can manage their own properties. Filters and sorting options enhance the search experience.

### Property Details
![Property Details]![image](https://github.com/user-attachments/assets/febab7c4-d59f-4570-b563-176f4ce2ddf8)


The property details page provides comprehensive information about each property, including price, location, bedrooms, and bathrooms. Clients can express interest by clicking the "Show Interest" button.

### Create Property (Agent Role)
![Create Property]![image](https://github.com/user-attachments/assets/a74eb840-26c1-4636-ba6b-75ee83cdad8e)

Agents can use this form to create new property listings by filling out the title, description, price, location, and other relevant details. Image uploads are supported for better property visualization.

### My Properties (Agent Role)
![My Properties]![image](https://github.com/user-attachments/assets/80d89a00-083b-4ae3-8df4-deef66acb757)

Agents can view and manage their listed properties. They have the ability to update or delete listings as necessary, with easy-to-use buttons for managing each property.

### Interested Clients (Agent Role)
![Interested Clients]![image](https://github.com/user-attachments/assets/8034ec36-9dc4-4130-9547-18bd1fcfe49a)

Agents can view a list of clients who have expressed interest in their properties, providing them with key contact information for follow-up.

### Map View
![Map View]![image](https://github.com/user-attachments/assets/592ea7c5-dde9-4a1f-b119-6fa3edb787d8)

Clients and agents can explore property locations through the interactive map feature. The map provides a visual representation of property locations, helping clients find homes in their preferred areas.

### Contact Page
![Contact Page]![image](https://github.com/user-attachments/assets/f61e2446-16f8-43bc-9a73-7f88ceceb469)


### About Us Page
![About Us Page] ![image](https://github.com/user-attachments/assets/11e5e714-9614-4086-81be-0089033a73bd)
![image](https://github.com/user-attachments/assets/bd47571e-8798-44d3-8733-52281699483b)
![Uploading image.png…]()



The contact page includes important details like the business address, phone number, and email. Users can reach out to the platform’s support team for queries and assistance.








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

