import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                const response = await axios.get(`http://localhost:5000/api/properties/${id}`, {
                    headers: {
                        'Content-Type': 'application/json', // Setting Content-Type header
                    },
                });
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
                toast.success('Property fetched successfully!'); // Show success notification
                setLoading(false); // Data fetched, stop loading
            } catch (error) {
                console.error('Error fetching property:', error);
                toast.error('Error fetching property data.'); // Show error notification
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
            await axios.put(`http://localhost:5000/api/properties/${id}`, property, {
                headers: {
                    'Content-Type': 'application/json', // Setting Content-Type header
                },
            });
            toast.success('Property updated successfully!'); // Show success notification
          // Delay the navigation for 2 seconds to allow toast to be shown
      setTimeout(() => {
        navigate(-1); // Redirect to the previous page (property list page)
      }, 2000); // Redirect to the previous page (property list page) after update
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error('Error updating property. Please try again.'); // Show error notification
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state until data is fetched
    }


    return (
        <div className="p-6">
            <div className="text-2xl">
                <Title text1={'EDIT'} text2={' PROPERTY'} />
                {/* ToastContainer component to display notifications */}
    
            </div>
             <ToastContainer  className='mt-16' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick  pauseOnHover={false} />
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
