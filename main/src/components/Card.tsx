import { Link } from 'react-router-dom';
import React from 'react';

// You can use a default placeholder image here for when the actual image is not available
import DefaultImage from '../assets/B1.jpg';

interface CardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string; // Add image prop to accept Base64 image
  showDeleteButton?: boolean;
  onDelete?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, title, price, location, image, showDeleteButton = false, onDelete }) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the event from propagating to the Link
    onDelete?.(id); // Trigger the delete action
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Wrap only the non-interactive part in the Link */}
      <Link to={`/property/${id}`} className="block">
        <div className="overflow-hidden">
          <img
            className="object-cover w-full h-40 hover:scale-105 transition-transform duration-500 ease-in-out"
            src={image || DefaultImage} // Use Base64 image or placeholder image
            alt={title}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-gray-500">{location}</p>
          <p className="mt-2 text-xl font-semibold text-green-600">₹{price}</p>
        </div>
      </Link>

      {showDeleteButton && (
        <div className="p-4 flex gap-2">
          <Link
            to={`/editproperty/${id}`}
            className="flex-1 bg-blue-500 text-white text-sm font-semibold text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update
          </Link>
          <button
            className="flex-1 bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
