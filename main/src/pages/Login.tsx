import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Both email and password are required.');
    }

    if (!emailRegex.test(email)) {
      return setError('Invalid email format.');
    }
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      console.log(response.data);
      // Save token to localStorage (or context)
      localStorage.setItem('token', response.data.token);
      setSuccess(response.data.message);
      setError('');
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.response?.data?.message || 'Error logging in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
    <div className='inline-flex item-center gap-2 mb-2 mt-10'>
      <p className='prata-regular text-3xl'>Login</p>
      <hr className='border-none h-[1.5px] w-8 bg-gray-700' />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      </div>
  
      <input
        className=' w-full px-3 py-2 border border-gray-800'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className=' w-full px-3 py-2 border border-gray-800'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
     <div className="flex flex-row gap-4">
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:1205686068. */}
      <button className='inline-block w-full px-3 py-2 border border-gray-800'type="submit">Login</button>
      <button onClick={()=>window.location.href='/register'} className=' px-3 py-2 border-noun 'type="button">Register</button>
      </div>
    
    </form>

  );
};

export default Login;
