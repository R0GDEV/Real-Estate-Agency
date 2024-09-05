
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Title from '../components/Title';
import React from 'react';
import axios from 'axios';

const Propertie = () => {
  interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
}


  const [showFilter, setShowfilter] = useState(false);
  const [filterProducts, setfilter] = useState([]);
  
  const [properties, setProperties] = useState < Property[] > ([]);
  const [filteredProperties, setFilteredProperties] = useState < Property[] > ([]);
  const [selectedLocations, setSelectedLocations] = useState < string[] > ([]);

  useEffect(() => {
      // Fetch properties from the backend
      const fetchProperties = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/properties');
              setProperties(response.data);
              setFilteredProperties(response.data); // Initially show all properties
          } catch (error) {
              console.error('Error fetching properties:', error);
          }
      };

      fetchProperties();
  }, []);

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
    <div>
    
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
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Mumbai'} /> Mumbai1 </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Navi Mumbai'} /> Navi Mumbai </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Panvel'} /> Panvel</p>
            </div>
          </div>

          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            < p className='mb-3 text-sm font-medium'>Location</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Mumbai'} /> Mumbai </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Navi Mumbai'} /> Navi Mumbai </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Panvel'} /> Panvel</p>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2x1 mb-4'>

            <Title text1={'ALL'} text2={'COLLECTIONS'} />
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
                <Card  id={"xyz"} title={"xyz"}  price={"xyz"}  location={"xyz"} />
                

              //setfilter.map((item, index) => (

                //<Card key={index} id={item.id} title={item.title} price={item.price} location={item.location} />
              //))
            }
          </div>
        </div>




      </div>
    </div>
  )
}

export default Propertie