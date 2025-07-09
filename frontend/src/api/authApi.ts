import fetchClient from './fetchClient';

export const login = async (email: string, password: string) => {
  const data = await fetchClient.post('/api/users/login', { email, password });
  if (!data || !data.user) {
    return null;
  }
  console.log('User logged in:', data.user);
  return data;
};

export const register = async (
  fullName: string,
  email: string,
  password: string,
  role: string = 'Learner'
) => {
  const data = await fetchClient.post('/api/users/register', {
    fullName,
    email,
    password,
    role,
  });
  return data;
};

export const logout = async () => {
  await fetchClient.post('/api/users/logout');
};
