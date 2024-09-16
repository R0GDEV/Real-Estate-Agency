import { useEffect, useState } from 'react'
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
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        // Fetch properties from the backend
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:5000/api/properties/myinterest', {
                    token
                  });
                console.log(response.data);
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false); // Set loading to false when data is fetched
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
                                    showDeleteButton={false} // Show delete button
                                    onDelete={""}
                                />
                            ))
                        ) : (
                            loading ? (
                                <p>Loading properties...</p>
                            ) : (
                                <p>No properties available.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interested