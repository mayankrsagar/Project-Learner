import fetchClient from './fetchClient';

export const fetchMe = async (): Promise<unknown> => {
  return await fetchClient.get('/api/users/me');
};

export const updateProfile = async (profileData: unknown): Promise<unknown> => {
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
