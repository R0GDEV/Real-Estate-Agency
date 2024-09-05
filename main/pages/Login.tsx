import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log(response.data);
      // Save token to localStorage (or context)
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='flex flex-col sm:grid grid-cols gap-14 my-10 mt-40 text-sm mx-auto w-full sm:w-1/2'>
    <div>
    <form className='flex flex-col gap-2 bg-zinc-500' onSubmit={handleSubmit}>
      <input
        className='p-2 mt-4 m-auto bg-slate-50 rounded-lg'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      /><br></br>
      <input
        className='p-2 m-auto bg-slate-50 rounded-lg'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      /><br></br>
     
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:1205686068. */}
      <button className='inline-block p-2 m-auto bg-slate-50 rounded-lg'type="submit">Login</button>
      <button onClick={()=>window.location.href='/register'} className='p-2 m-auto bg-slate-50 rounded-lg'type="button">Register</button>
      
    </form>
</div></div>
  );
};

export default Login;
