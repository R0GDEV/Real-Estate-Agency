import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import axios from 'axios';
import Card from '../components/Card';

function Interested() {
    interface Property {
        id: string;
        title: string;
        description: string;
        price: number;
        location: string;
    }



    const [properties, setProperties] = useState<Property[]>([]);




    useEffect(() => {
        // Fetch properties from the backend
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/properties/myinterest');
                console.log(response.data);
                setProperties(response.data); // Set the properties to state
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className='px-4'>

            <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
                <div className='flex-1'>
                    <div className='flex justify-between text-base sm:text-2x1 mb-4'>

                        <Title text1={'ALL'} text2={' INTERESTED'} />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <Card
                                    key={property.id}
                                    id={property.id}
                                    title={property.title}
                                    price={property.price}
                                    location={property.location}
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

export default Interested