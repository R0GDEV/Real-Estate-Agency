import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { propertiesData } from '../components/StaticData'; // Import static data
import Image from '../assets/B1.jpg';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify styles

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
  image?: string; // Add image property to hold the base64 image
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [visible, setVisible] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleShowInterest = async (propertyId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/properties/interest/${propertyId}`, { token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Interest registered successfully!'); // Show success toast
      setIsInterested(true);
    } catch (error) {
      console.error('Error showing interest:', error);
      toast.error('Error showing interest. Please try again.'); // Show error toast
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const propertyData = response.data;

        if (Array.isArray(propertyData) && propertyData.length > 0) {
          setProperty(propertyData[0]);
        } else {
          toast.error('Property not found'); // Show error toast
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching property details from API:', error);

        // Fallback to static data if API call fails
        const fallbackProperty = propertiesData.find((prop) => prop._id === id);
        if (fallbackProperty) {
          setProperty(fallbackProperty);
          toast.info('Using static data as API failed.'); // Show info toast
        } else {
          toast.error('Property not found in static data'); // Show error toast
        }

        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (isLoading) {
    return <p>Loading property details...</p>;
  }

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-gray-100 to-white shadow-2xl rounded-xl mt-12">
     <ToastContainer  className='mt-16' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick  pauseOnHover={false} /> {/* ToastContainer */}
      
      <div className="md:flex md:space-x-8">
        {/* Property Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          {property.image ? (
            <img
              className="w-full h-72 rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
              src={property.image} // Use the base64 image from the property object
              alt={property.title}
            />
          ) : (
            <img
              className="w-full h-72 rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
              src={Image} // Fallback to default image if no base64 image is available
              alt={property.title}
            />
          )}
        </div>

        {/* Property Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-4xl text-gray-800 mb-4">{property.title}</h2>
            <p className="text-gray-600 text-lg mb-4">{property.description}</p>
            <div className="flex gap-6 text-lg font-medium mb-4">
              <p className="text-gray-700">Price: <span className="text-green-600">${property.price}</span></p>
              <p className="text-gray-700">Location: {property.location}</p>
            </div>

            <div className="flex gap-6 mb-4">
              <p className="text-gray-600">Bedrooms: {property.bedrooms}</p>
              <p className="text-gray-600">Bathrooms: {property.bathrooms}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md transition duration-300"
              onClick={toggleVisibility}
            >
              {visible ? 'Hide Details' : 'Show Details'}
            </button>

            <button
              className={`w-1/2 py-3 rounded-lg shadow-md transition duration-300 ${isInterested ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
              onClick={() => !isInterested && handleShowInterest(property._id)}
              disabled={isInterested}
            >
              {isInterested ? 'Interested' : 'Show Interest'}
            </button>
          </div>
        </div>
      </div>

      {/* Additional Details with Smooth Transition */}
      <div
        className={`mt-5 bg-gray-50 p-6 rounded-lg shadow-inner transition-all duration-1000 ease-in-out ${visible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        style={{ transitionProperty: 'max-height, opacity' }} // Manually set max-height and opacity transitions
      >
        {visible && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Additional Details</h3>
            <p className="text-gray-600 mt-2">Owner: {property.owner}</p>

            {role === 'agent' && (
              <>
                <h3 className="mt-4 text-xl font-semibold">Interested Clients</h3>
                {property.interestedClients.length > 0 ? (
                  <ul className="list-disc list-inside mt-2">
                    {property.interestedClients.map((clientEmail, index) => (
                      <li key={index} className="text-gray-700">
                        {clientEmail}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No clients have expressed interest yet.</p>
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
