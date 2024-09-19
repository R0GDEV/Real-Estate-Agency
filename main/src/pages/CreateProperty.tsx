import React, { useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';

const CreateProperty: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [message, setMessage] = useState('');

  // Get JWT from localStorage (or wherever it's stored)
  const token = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(token);
      const response = await axios.post(
        'https://real-estate-agency-beckend.onrender.com/api/properties',
        {
          title,
          description,
          price,
          location,
          bedrooms,
          bathrooms,
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Setting Content-Type header
          },
        }
      );
      

      setMessage('Property created successfully!');
      console.log('Property created:', response.data);


    } catch (error) {
      setMessage('Error creating property');
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="text-2xl"><Title text1={'CREATE'} text2={' PROPERTY'} /></div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Bedrooms</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Bathrooms</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image </label>
          <input type="file"
            accept="image/*"
            onChange={handleSubmit}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Property
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CreateProperty;
