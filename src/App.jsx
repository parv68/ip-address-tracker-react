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
    <div className="min-h-screen bg-gray-100">
      
        
      <SearchBar handleSearch={handleSearch} setIpInput={setIpInput} ipInput={ipInput} />
      {locationError && <p className="text-red-500 text-center">{locationError}</p>}
      {ipData && <IPInfo ipData={ipData} />}
      <MapView coordinates={coordinates} />
    </div>
  );
};

export default App;
