import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the City type
interface City {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null); // Use L.Map | null type
  const [selectedCity, setSelectedCity] = useState<City | null>(null); // Use City | null type

  // Array of cities
  const cities: City[] = [
    { name: 'Mumbai', lat: 19.07933, lng: 72.87814, zoom: 12 },
    { name: 'Navi Mumbai', lat: 19.03547, lng: 73.01863, zoom: 12 },
    { name: 'Panvel', lat: 18.99584, lng: 73.12167, zoom: 12 },
    { name: 'Pune', lat: 18.52519, lng: 73.85422, zoom: 12 },
    { name: 'Nashik', lat: 20.01125, lng: 73.79024, zoom: 12 },
  ];

  // Function to set the city
  const setCity = (lat: number, lng: number, zoom: number) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], zoom); // Update map view
    }
  };

  useEffect(() => {
    // Initialize the map with default city
    const initialCity = cities[0];
    const map = L.map('map').setView([initialCity.lat, initialCity.lng], initialCity.zoom);
    mapRef.current = map;

    // Set up OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a default marker to the first city
    L.marker([initialCity.lat, initialCity.lng]).addTo(map).bindPopup(initialCity.name).openPopup();

    // Set the initial city in state
    setSelectedCity(initialCity);
  }, []);

  // Update the map when the selected city changes
  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity.lat, selectedCity.lng, selectedCity.zoom); // Update map view
      L.marker([selectedCity.lat, selectedCity.lng]).addTo(mapRef.current!).bindPopup(selectedCity.name).openPopup();
    }
  }, [selectedCity]);

  // Handle city change
  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen py-10">
      {/* Map Section */}
      <div
        id="map"
        style={{ height: '700px', width: '100%' }}
        className="mb-6 border border-gray-300 rounded-lg relative z-0 shadow-lg"
      ></div>

      {/* City Buttons */}
      <div className="flex justify-center flex-col gap-4 sm:flex-row items-center">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => handleCityChange(city)}
            className={`px-6 py-3 font-semibold rounded-lg mx-2 w-40 text-white transition-all duration-300 transform ${
              selectedCity?.name === city.name
                ? `bg-blue-700 shadow-lg scale-105`
                : `bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-md`
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;
