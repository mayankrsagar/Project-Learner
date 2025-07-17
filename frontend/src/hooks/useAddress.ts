import {
  useEffect,
  useState,
} from 'react';

import {
  geocode,
  OutputFormat,
} from 'react-geocode';

import { getGoogleMapsApiKey } from '@/utils/googleMapApi';

export function useAddress(): string {
  const [address, setAddress] = useState("Fetching address...");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const apiKey = getGoogleMapsApiKey();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
      },
      () => setAddress("Location access denied")
    );
  }, []);

  useEffect(() => {
    if (coordinates.lat !== 0 && coordinates.lng !== 0) {
      geocode("latlng", `${coordinates.lat},${coordinates.lng}`, {
        key: apiKey,
        language: "en",
        region: "in",
        outputFormat: OutputFormat.JSON,
      })
        .then((response) => {
          const formattedAddress = response.results[0].formatted_address;
          setAddress(formattedAddress);
        })
        .catch(() => setAddress("Unable to fetch address"));
    }
  }, [coordinates, apiKey]);

  return address;
}
