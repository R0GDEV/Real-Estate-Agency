
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const [role, setRole] = useState('client');
  const [success, setSuccess] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      return setError('Invalid email format.');
    }

    if (password.length < 8) {
      return setError('Password must be at least 8 characters long.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    try {
      const response = await axios.post('https://real-estate-agency-beckend.onrender.com/api/register', {
        email,
        password,
        role, 
      },
      {
        headers: {
          'Content-Type': 'application/json', // Setting Content-Type header
        },
      }
    );
      console.log(response.data);
      setSuccess(response.data.message);
      setError('');
      // Save token to localStorage (or context)
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
     // setError(error.response?.data?.message || 'Error registering user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
    
    <div className='inline-flex item-center gap-2 mb-2 mt-10'>
      <p className='prata-regular text-3xl'>Register</p>
      
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
      
          <input
           className=' w-full px-3 py-2 border border-gray-800'
            type="password"
            
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
           
             placeholder="Confirm Password"
            required
          />
        <label>Role</label>
        <select value={role} 
        
        onChange={(e) => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="agent">Agent</option>
        </select>
  
     <div className="flex flex-row gap-4">
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:1205686068. */}
      <button className='inline-block w-full px-3 py-2 border border-gray-800'type="submit">Register</button>
      <button onClick={()=>window.location.href='/login'} className=' px-3 py-2 border-noun 'type="button">Login</button>
      </div>
    
    </form>
  );
};

export default Register;