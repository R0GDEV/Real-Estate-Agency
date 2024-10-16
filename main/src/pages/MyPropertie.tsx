import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { propertiesData } from '../components/StaticData'; // Import static fallback data

function MyPropertie() {
    interface Property {
        _id: string;
        title: string;
        description: string;
        price: any;
        location: string;
        image: string | null; // Allow image to be null initially
    }

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch properties from the backend
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:5000/api/properties/myproperties',
                    {
                        token,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setProperties(response.data); // Set the properties to state
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

    const handleDeleteProperty = async (propertyId: string) => {
        try {
            // Send DELETE request to backend
            const response = await axios.delete(
                `http://localhost:5000/api/properties/${propertyId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Property deleted:', response.data);

            // Remove the deleted property from the list in the frontend
            setProperties(properties.filter((property) => property._id !== propertyId));

            // Show success toast notification
            toast.success(`Property deleted successfully!`);
        } catch (error) {
            console.error('Error deleting property:', error);

            // Show error toast notification
            toast.error('Error deleting property. Please try again.');
        }
    };

    return (
        <div className='px-4'>
               <ToastContainer  className='mt-16' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick  pauseOnHover={false} />
            <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
                <div className='flex-1'>
                    <div className='flex justify-between text-base sm:text-2xl mb-4'>
                        <Title text1={'ALL'} text2={'PROPERTY'} />
                        <Link to={'/property/create'}>
                            <p className="border border-black px-8 py-4 text-sm hover:bg-violet-100 transition-all duration-500">
                                Create
                            </p>
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <Card
                                    key={property._id}
                                    id={property._id}
                                    title={property.title}
                                    price={property.price}
                                    location={property.location}
                                    image={property.image || ''} // Pass the image or empty string if null
                                    showDeleteButton={true}
                                    onDelete={handleDeleteProperty}
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

export default MyPropertie;
