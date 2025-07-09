import fetchClient from './fetchClient';

export const fetchMe = async () => {
  const data = await fetchClient.get('/api/users/me');
  return data;
};

export const updateProfile = async (profileData: any) => {
  const data = await fetchClient.put('/api/users/me', profileData);
  return data;
};

export const uploadResume = async (formData: FormData) => {
  const data = await fetchClient.post('/api/users/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
