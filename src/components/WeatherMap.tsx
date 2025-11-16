import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WeatherMapProps {
  center?: [number, number];
  city?: string;
}

export function WeatherMap({ center, city }: WeatherMapProps) {
  const position: L.LatLngExpression = center ? [center[1], center[0]] : [0, 0];

  return (
    <div className="w-full h-full overflow-hidden">
      <MapContainer
        center={position as L.LatLngExpression}
        zoom={center ? 10 : 2}
        style={{ height: '100%', width: '100%' }}
        className="z-0 h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {center && (
          <Marker position={position as L.LatLngExpression}>
            <Popup>{city}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
