"use client";
import {
  useEffect,
  useState,
} from 'react';

import { getGoogleMapsApiKey } from '@/utils/googleMapApi';
import { GoogleMapsEmbed } from '@next/third-parties/google';

export default function Map() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const locationQuery = coords ? `${coords.lat},${coords.lng}` : null;

  return (
    <div className="h-full w-full">
      {locationQuery && (
        <GoogleMapsEmbed
          apiKey={getGoogleMapsApiKey()}
          height="100%"
          width="100%"
          mode="place"
          q={locationQuery}
        />
      )}
    </div>
  );
}
