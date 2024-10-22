import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/searchbar';
import IPInfo from './components/ipinfo';
import MapView from './components/mapview';


const App = () => {
  const [ipData, setIpData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [ipInput, setIpInput] = useState('');
  const [locationError, setLocationError] = useState(null);

  // Function to fetch IP data based on the coordinates
  const fetchIpData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=37bb0862fe824b478b8bd9c15babcc7b
&lat=${lat}&long=${lon}`
      );
      setIpData(response.data);
      setCoordinates([lat, lon]); // Set coordinates for the map view
    } catch (error) {
      console.error('Error fetching IP data:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Basic validation for IP address format (IPv4)
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!ipPattern.test(ipInput)) {
      setLocationError('Please enter a valid IP address');
      return;
    }
  
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=37bb0862fe824b478b8bd9c15babcc7b&ip=${ipInput}`
      );
      setIpData(response.data);
      setCoordinates([response.data.latitude, response.data.longitude]);
      setLocationError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching IP data:', error);
      setLocationError('Failed to fetch IP data. Please try again.');
    }
  };

  // Request user's location when page loads
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchIpData(latitude, longitude); // Fetch IP info based on user's location
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
    <div className="min-h-screen bg-gray-200">
      <SearchBar handleSearch={handleSearch} setIpInput={setIpInput} ipInput={ipInput} />
      {locationError && <p className="text-red-500 text-center">{locationError}</p>}
      {ipData && <IPInfo ipData={ipData} />}
      <MapView coordinates={coordinates} />
    </div>
  );
};

export default App;
