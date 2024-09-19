import  { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';

const EditPropertyForm = () => {
    const { id } = useParams(); // Get the property ID from the URL
    const navigate = useNavigate(); // For redirecting after update

    const [property, setProperty] = useState({
        title: '',
        price: '',
        location: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
    });
    const [loading, setLoading] = useState(true); // Track loading state

    // Fetch property details for editing
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`https://real-estate-agency-beckend.onrender.com/api/properties/${id}`,
                    {
                      headers: {
                        'Content-Type': 'application/json', // Setting Content-Type header
                      },
                    }
                  );
                const propertyData = response.data[0]; // Access the first property in the array
                if (propertyData) {
                    setProperty({
                        title: propertyData.title,
                        price: propertyData.price,
                        location: propertyData.location,
                        description: propertyData.description,
                        bedrooms: propertyData.bedrooms,
                        bathrooms: propertyData.bathrooms,
                    });
                }
                setLoading(false); // Data fetched, stop loading
            } catch (error) {
                console.error('Error fetching property:', error);
                setLoading(false); // Stop loading even if there's an error
            }
        };

        fetchProperty();
    }, [id]);

    // Handle form field changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };
    
    // Handle form submission for editing property
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://real-estate-agency-beckend.onrender.com/api/properties/${id}`, property,
                {
                  headers: {
                    'Content-Type': 'application/json', // Setting Content-Type header
                  },
                }
              );
            console.log('Property updated successfully:', response.data);
            navigate('/properties'); // Redirect to property list page after update
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state until data is fetched
    }

    return (
        <div className="p-6">
            <div className="text-2xl">
                <Title text1={'EDIT'} text2={' PROPERTY'} />
            </div>
            <form onSubmit={handleSubmit} className="edit-property-form">
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={property.title}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={property.description}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={property.price}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={property.location}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Bedrooms</label>
                    <input
                        type="number"
                        name="bedrooms"
                        value={property.bedrooms}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Bathrooms</label>
                    <input
                        type="number"
                        name="bathrooms"
                        value={property.bathrooms}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Edit Property
                </button>
            </form>
        </div>
    );
};

export default EditPropertyForm;
