
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      console.log(response.data);
      // Save token to localStorage (or context)
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='flex flex-col sm:grid grid-cols gap-14 my-10 mt-40 text-sm mx-auto w-full sm:w-1/2'>
      <div>
        <form className='flex flex-col gap-2 bg-zinc-500' onSubmit={handleSubmit}>
          <input
            type="text" className='p-2 mt-4 m-auto bg-slate-50 rounded-lg'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email" className='p-2 m-auto bg-slate-50 rounded-lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password" className='p-2 m-auto bg-slate-50 rounded-lg'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
         
          <button className='inline-block p-2 m-auto bg-slate-50 rounded-lg'type="submit">Register</button>
      <button onClick={()=>window.location.href='/register'} className='p-2 m-auto bg-slate-50 rounded-lg'type="button"> Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
