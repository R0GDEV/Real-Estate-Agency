import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test accounts for bypass login
  const testAccounts = [
    { role: 'agent', email: 'agent@example.com', password: 'Agent1234' },
    { role: 'client', email: 'client@example.com', password: 'Client1234' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Both email and password are required.');
    }

    if (!emailRegex.test(email)) {
      return toast.error('Invalid email format.');
    }

    if (password.length < 8) {
      return toast.error('Password must be at least 8 characters long.');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      toast.success('Login successful!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError && !error.response) {
        // Handle the test account login fallback
        const testAccount = testAccounts.find(
          (account) => account.email === email && account.password === password
        );

        if (testAccount) {
          localStorage.setItem('token', 'test-token');
          localStorage.setItem('role', testAccount.role);
          toast.success(`Logged in as ${testAccount.role} (Test Account)`);
          navigate('/');
          window.location.reload();
        } else {
          toast.error('Invalid credentials for test accounts.');
        }
      } else if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Login failed.';
        toast.error(errorMessage);
      } else {
        toast.error('An unknown error occurred. Please try again.');
      }
    }
  };

  const handleTestAccount = (account: { role: string; email: string; password: string }) => {
    setEmail(account.email);
    setPassword(account.password);
    toast.info(`Using ${account.role} Test Account`);
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

      {/* Modal */}
  

      {/* Form Container */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transition-all duration-500 hover:shadow-xl hover:scale-105">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Login</h1>
        <hr className="my-4 w-16 mx-auto rounded-lg border-2 border-indigo-600" />

        {/* Input Fields */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Button */}
        <div className="mt-4">
          <button
            onClick={() => navigate('/register')}
            className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            Register
          </button>
        </div>

        {/* Test Accounts Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Use Test Account:</p>
          <div className="flex justify-center space-x-4 mt-3">
            {testAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => handleTestAccount(account)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                {account.role.charAt(0).toUpperCase() + account.role.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
