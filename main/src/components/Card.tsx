import { Link, useNavigate } from "react-router-dom";
import React from "react";

// Default placeholder image
import DefaultImage from "../assets/interior.webp";

interface CardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  showDeleteButton?: boolean;
  onDelete?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, title, price, location, image, showDeleteButton = false, onDelete }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Function to handle authentication check
  const requireAuth = (e: React.MouseEvent, callback: () => void) => {
    if (!token) {
      e.preventDefault(); // Prevent default action
      navigate("/login"); // Redirect to login
    } else {
      callback();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation to prevent unintended navigation
    requireAuth(e, () => onDelete?.(id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Protected Link - Prevent navigation if not authenticated */}
      <Link to={`/property/${id}`} className="block" onClick={(e) => requireAuth(e, () => {})}>
        <div className="overflow-hidden">
          <img
            className="object-cover w-full h-40 hover:scale-105 transition-transform duration-500 ease-in-out"
            src={image || DefaultImage}
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
          {/* Protected Update Button */}
          <Link
            to={`/editproperty/${id}`}
            className="flex-1 bg-blue-500 text-white text-sm font-semibold text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={(e) => requireAuth(e, () => navigate(`/editproperty/${id}`))}
          >
            Update
          </Link>

          {/* Protected Delete Button */}
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
