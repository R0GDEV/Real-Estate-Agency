

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Image from '../assets/B.jpg'
interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  owner: string;
  interestedClients: string[];
}


const Details: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [visible, setVisible] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Get the role from localStorage
    setRole(storedRole); // Set the role in the state
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleShowInterest = async (propertyId: string) => {
    try {
      const token = localStorage.getItem('token');
      // Make a POST request to add interest in the property
      const response = await axios.post(`http://localhost:5000/api/properties/interest/${propertyId}`, {
        token
      });

      console.log('Interest registered:', response.data);
      setIsInterested(true); // Update the state to show that the user is interested
    } catch (error) {
      console.error('Error showing interest:', error);
    }
  };
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
        const propertyData = response.data;

        // Assuming the response is an array and you're interested in the first item
        if (Array.isArray(propertyData) && propertyData.length > 0) {
          setProperty(propertyData[0]); // Set the first element of the array as the property
        } else {
          setError('Property not found');
        }

        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Error fetching property details');
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // Display loading message while fetching
  if (isLoading) {
    return <p>Loading property details...</p>;
  }

  // Display error message if there's an issue fetching the property
  if (error) {
    return <p>{error}</p>;
  }

  // If no property is found
  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="px-4 my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 overflow-hidden bg-white duration-300 transition-all ${visible ? 'w-full' : 'w-0'}" >
      <img className='w-full  md:max-w-[720px]' src={Image} alt="" />

      <div className="">


        <h2 className="font-semibold text-2xl text-gray-600 mb-2">{property.title}</h2>
        <p className="text-gray-700 mb-4">{property.description}</p>
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-gray-500">Price: {property.price}<br /></p>

          <div className='flex flex-col gap-5 sm:grid grid-cols-[1fr_1fr]'>
            <button className="border border-black px-8 py-4 text-sm " onClick={toggleVisibility}>
              {visible ? 'Hide Details' : 'Show Details'}
            </button>

            <button
              className="bg-green-500 text-white border border-black px-8 py-4 text-sm"
              onClick={() => handleShowInterest(property._id)} // Fix: Use arrow function
            >
              {isInterested ? 'Interested' : 'Show Interest'}
            </button>
          </div>
        </div>
        {visible && (
          <div className="mt-4">
            {/* Additional property details */}
            <p className="text-gray-700">Location: {property.location}</p>
            <p className="text-gray-700">Bedrooms: {property.bedrooms}</p>
            <p className="text-gray-700">Bathrooms: {property.bathrooms}</p>
            {role === 'agent' && (
              <>
                <h2 className="mt-6 text-xl font-semibold">Interested Clients</h2>
                {property.interestedClients.length > 0 ? (
                  <ul className="list-disc list-inside mt-2">
                    {property.interestedClients.map((clientEmail, index) => (
                      <li key={index} className="text-gray-700">
                        {clientEmail}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No clients have shown interest yet.</p>
                )}
              </>
            )}


          </div>
        )}
      </div>
    </div>


  );
};

export default Details;

