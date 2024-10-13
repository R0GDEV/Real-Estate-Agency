
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Title from '../components/Title';
//import React from 'react';
import axios from 'axios';
import { propertiesData } from '../components/StaticData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles

const Propertie = () => {
  interface Property {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: string;
  }
  const [showFilter, setShowfilter] = useState(false);
  // const [filterProducts, setfilter] = useState([]);

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [locationFilter] = useState('');
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data && response.data.length > 0) {
          setProperties(response.data); // Use API data
          setFilteredProperties(response.data);
        } else {
          setProperties(propertiesData); // Fallback to static data
          setFilteredProperties(propertiesData);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to static data if API request fails
        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
        // Show toast notification on error
        toast.error('Failed to fetch properties from the backend. Showing static data.');
      }
    };

    fetchProperties();
  }, []);
  useEffect(() => {
    if (locationFilter === '') {
      setFilteredProperties(properties); // Show all properties if no filter is selected
    } else {
      const filtered = properties.filter((property) =>
        property.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
      setFilteredProperties(filtered); // Update filtered properties
    }
  }, [locationFilter, properties]);

  // Handle checkbox change
  const handleLocationChange = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(item => item !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // Filter properties based on selected locations
  useEffect(() => {
    if (selectedLocations.length === 0) {
      setFilteredProperties(properties); // If no location is selected, show all properties
    } else {
      const filtered = properties.filter(property =>
        selectedLocations.includes(property.location)
      );
      setFilteredProperties(filtered);
    }
  }, [selectedLocations, properties]);

  const uniqueLocations = Array.from(new Set(properties.map(property => property.location)));
  return (
    <div className='px-4'>
     <ToastContainer  className='mt-16' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick  pauseOnHover={false} />
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        <div className='min-w-60'>
          <p onClick={() => setShowfilter(!showFilter)} className='my-2 text-xl flex items-center'>
            FILTER</p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            < p className='mb-3 text-sm font-medium'>Location</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {uniqueLocations.map(location => (
                <div key={location}>
                  <p className='flex gap-2'>
                    <input
                      className='w-3'
                      type="checkbox"
                      value={location}
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                    />
                    {location}
                  </p>
                </div>
              ))}

            </div>
          </div>


        </div>
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2x1 mb-4'>
            <Title text1={'ALL'} text2={' COLLECTIONS'} />
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-4'>

            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Card
                  key={property._id}
                  id={property._id}
                  title={property.title}
                  price={property.price}
                  location={property.location}
                  showDeleteButton={false} // Show delete button
                  onDelete={() => {}} // Pass a no-op function
                />
              ))
            ) : (
              <p>Loading properties...</p>
            )}

          </div>
        </div>




      </div>
    </div>
  )
}

export default Propertie