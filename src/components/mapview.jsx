
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ coordinates }) => {
  return (
    <div className="w-full h-96 mt-8">
      {coordinates ? (
        <MapContainer center={coordinates} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
            <Popup>Your Location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-center">Loading map...</p>
      )}
    </div>
  );
};

export default MapView;
