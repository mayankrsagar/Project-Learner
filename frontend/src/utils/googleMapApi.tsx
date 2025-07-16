
export function getGoogleMapsApiKey(): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!key) {
    throw new Error('Missing Google Maps API key in environment variables.');
  }

  return key;
}