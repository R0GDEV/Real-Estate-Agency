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

  // Array of cities with type City[]
  const cities: City[] = [
    { name: 'Mumbai', lat: 19.07933, lng: 72.87814, zoom: 12 }, 
    { name: 'Navi Mumbai', lat: 19.03547 , lng: 73.01863, zoom: 12 },
    { name: 'Panvel', lat: 18.99584, lng:  73.12167, zoom: 12 },
    { name: 'Pune', lat: 18.52519 , lng: 73.85422, zoom: 12 },
    { name: 'Nashik', lat:20.01125, lng:  73.79024, zoom: 12 },
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
    <div>
       <div
    id="map"
    style={{ height: '700px', width: '100%' }}
    className="mb-6 border border-gray-300 rounded-lg relative z-0"
  ></div>
      
      <div className="flex justify-center flex-col gap-2 sm:flex-row">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => handleCityChange(city)}
            className={`px-4 py-4 text-white rounded mx-5  ${
              selectedCity?.name === city.name ? 'bg-blue-600' : 'bg-blue-500'
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
