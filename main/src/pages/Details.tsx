import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Details = () => {
  const [properties, setProperties] = useState < Property[] > ([]);
  useEffect(() => {
    
    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/properties/:$id');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    fetchProperties();
}, []);
  return (
    <div className=''>Details</div>
  )
}

export default Details

