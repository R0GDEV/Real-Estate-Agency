import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      return toast.error('Invalid email format.');
    }

    if (password.length < 8) {
      return toast.error('Password must be at least 8 characters long.');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match.');
    }

    try {
       await axios.post('http://localhost:5000/api/register', {
        email,
        password,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error('Error registering user.');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-900 p-4">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <svg
          className="absolute w-full h-auto bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1e293b"
            fillOpacity="0.7"
            d="M0,288L30,272C60,256,120,224,180,197.3C240,171,300,149,360,170.7C420,192,480,256,540,256C600,256,660,192,720,154.7C780,117,840,107,900,122.7C960,139,1020,181,1080,202.7C1140,224,1200,224,1260,234.7C1320,245,1380,267,1410,277.3L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transition-all duration-500 hover:shadow-xl hover:scale-105">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Register</h1>
        <hr className="my-4 w-16 mx-auto rounded-lg border-2 border-indigo-600" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />

          <label className="block text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="client">Client</option>
            <option value="agent">Agent</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            Login
          </button>
        </div>
      </div>

      <ToastContainer  className='mt-16' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} theme="dark"  closeOnClick  pauseOnHover={false} />
    </div>
  );
};

export default Register;
