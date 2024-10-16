import React, { useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProperty: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null); // State for storing the Base64 image
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Get JWT from localStorage (or wherever it's stored)
  const token = localStorage.getItem('token');

  // Constants for image validation
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_WIDTH = 800; // Maximum width in pixels
  const MAX_HEIGHT = 800; // Maximum height in pixels

  // Function to handle image conversion to Base64 with validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Image size exceeds 2MB limit.');
        return;
      }

      const img = new Image();
      const reader = new FileReader();
      
      reader.onloadend = () => {
        img.src = reader.result as string; // Set image source to the loaded file
      };
      reader.readAsDataURL(file);

      img.onload = () => {
        // Check image dimensions
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          toast.error(`Image dimensions exceed ${MAX_WIDTH}x${MAX_HEIGHT} pixels.`);
          return;
        }
        setImage(reader.result as string); // Convert image to Base64
      };

      img.onerror = () => {
        toast.error('Error loading image. Please try again.');
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure all fields are filled
      if (!title || !description || !price || !location || !bedrooms || !bathrooms || !image) {
        toast.error('Please fill in all fields.');
        setLoading(false);
        return;
      }

      // Send request to create a property
      const response = await axios.post('http://localhost:5000/api/properties',
        {
          title,
          description,
          price,
          location,
          bedrooms,
          bathrooms,
         // image, // Send the Base64 image
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Setting Content-Type header
          },
        }
      );

      toast.success('Property created successfully!');
      console.log('Property created:', response.data);
      navigate(-1); // Navigate back

    } catch (error) {
      toast.error('Error creating property');
      console.error('Error:', error);
    } finally {
      setLoading(false); // Reset loading to false after operation is done
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
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {image && <img src={image} alt="Preview" className="mt-4 h-40 object-cover rounded-lg" />} {/* Image preview */}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Creating...' : 'Create Property'} {/* Change text while loading */}
        </button>
      </form>
      <ToastContainer className='mt-16' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover={false} />
    </div>
  );
};

export default CreateProperty;
