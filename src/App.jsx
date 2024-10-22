import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/searchbar'; 
import IPInfo from './components/ipinfo';
import MapView from './components/mapview'; 

const App = () => {
  const [ipData, setIpData] = useState(null);
  const [coordinates, setCoordinates] = useState(null); // Initially null for empty map
  const [ipInput, setIpInput] = useState('');
  const [locationError, setLocationError] = useState(null);

  // Function to handle search for IP address
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=37bb0862fe824b478b8bd9c15babcc7b&ip=${ipInput}`
      );
      setIpData(response.data);
      setCoordinates([response.data.latitude, response.data.longitude]);
    } catch (error) {
      console.error('Error fetching IP data:', error);
    }
  };

  // Request user's location when page loads
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          setLocationError('Unable to retrieve your location');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 py-6 text-white text-center">
        <h1 className="text-3xl font-bold">IP Address Tracker</h1>
      </header>

      <SearchBar handleSearch={handleSearch} setIpInput={setIpInput} ipInput={ipInput} />
      
      {locationError && <p className="text-red-500 text-center">{locationError}</p>}
      
      <IPInfo ipData={ipData} />

      <MapView coordinates={coordinates} />
    </div>
  );
};

export default App;
