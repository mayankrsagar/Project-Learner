import axiosClient from './axiosClient';

export const login = async (email: string, password: string) => {
  console.log('Logging in user:', email);
  const { data } = await axiosClient.post('/api/users/login', { email, password });
  console.log('Login response:', data);
  if (!data || !data.user) {
    console.error('Login failed:', data);
    return null;
  }
  return data;
};

export const register = async (
  fullName: string,
  email: string,
  password: string,
  role: string = 'Learner'
) => {
  const { data } = await axiosClient.post('/api/users/register', {
    fullName,
    email,
    password,
    role,
  });
  return data;
};

export const logout = async () => {
  await axiosClient.post('/api/users/logout');
};