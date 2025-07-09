import fetchClient from './fetchClient';

export const fetchMe = async () => {
  const data = await fetchClient.get('/api/users/me');
  return data;
};
