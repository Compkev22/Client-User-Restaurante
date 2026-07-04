'use strict';

import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER = [14.6349, -90.5069];

const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const LocationMarker = ({ position, onPositionChange }) => {
    useMapEvents({
        click(e) {
            onPositionChange(e.latlng.lat, e.latlng.lng);
        },
    });

    return position ? <Marker position={position} icon={markerIcon} /> : null;
};

const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 15);
        }
    }, [center, map]);
    return null;
};

export const MapPicker = ({ lat, lng, onLocationChange }) => {
    const [position, setPosition] = useState(
        lat && lng ? [lat, lng] : null
    );

    const handlePositionChange = useCallback((newLat, newLng) => {
        setPosition([newLat, newLng]);
        onLocationChange(newLat, newLng);
    }, [onLocationChange]);

    const center = position || DEFAULT_CENTER;

    return (
        <div className="space-y-3">
            <label className="block text-xs font-bold text-[#a16207] uppercase">
                Ubicacion en el Mapa
            </label>

            <div className="rounded-xl overflow-hidden border border-gray-200" style={{ height: 260 }}>
                <MapContainer
                    center={center}
                    zoom={position ? 15 : 12}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterMap center={center} />
                    <LocationMarker
                        position={position}
                        onPositionChange={handlePositionChange}
                    />
                </MapContainer>
            </div>

            {position && (
                <p className="text-[11px] text-gray-400 font-mono">
                    Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
                </p>
            )}

            {!position && (
                <p className="text-[11px] text-gray-400">
                    Haz clic en el mapa para seleccionar la ubicacion de entrega.
                </p>
            )}
        </div>
    );
};
