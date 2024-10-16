import { useEffect, useState } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import Card from '../components/Card';
import { propertiesData } from '../components/StaticData'; // Import static data
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Interested() {
    interface Property {
        _id: string;
        title: string;
        description: string;
        price: any;
        image: string | null; // Allow image to be null initially
        location: string;
    }

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch properties from the backend
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:5000/api/properties/myinterest', { token }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties from API:', error);
                toast.error('Failed to fetch data from API. Using static data.');
                
                // Fallback to static data
                setProperties(propertiesData);
            } finally {
                setLoading(false); // Set loading to false when data is fetched
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className='px-4'>
            <ToastContainer  className='mt-16' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick  pauseOnHover={false} />

            <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
                <div className='flex-1'>
                    <div className='flex justify-between text-base sm:text-2xl mb-4'>
                        <Title text1={'ALL'} text2={' INTERESTED'} />
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-4 '>
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <Card
                                    key={property._id}
                                    id={property._id}
                                    title={property.title}
                                    price={property.price}
                                    location={property.location}
                                    image={property.image || ''} // Pass the image or empty string if null
                                    showDeleteButton={false}
                                    onDelete={() => {}} // Pass a no-op function
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
    );
}

export default Interested;
