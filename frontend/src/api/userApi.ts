import { UserProfile } from '@/types';

import fetchClient from './fetchClient';

interface FetchMeResponse {
  message: string;
  user: UserProfile;
}

export const fetchMe = async (): Promise<FetchMeResponse> => {
  return await fetchClient.get('/api/users/me') as FetchMeResponse;
};

export const updateProfile = async (profileData: UserProfile): Promise<unknown> => {
  return await fetchClient.put('/api/users/me', profileData);
};

export const uploadResume = async (formData: FormData): Promise<unknown> => {
  return await fetchClient.post('/api/users/resume', formData, {
    headers: {
      // Browser will set the correct multipart boundary automatically,
      // so you can actually omit Content-Type here; fetch will do it.
    },
  });
};
