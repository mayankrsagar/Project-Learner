import { UserProfile } from '@/types';

import fetchClient from './fetchClient';

interface LoginResponse {
  user: UserProfile;
  message?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  // Tell TS this is a LoginResponse
  const data = (await fetchClient.post(
    '/api/users/login',
    { email, password }
  )) as LoginResponse;

  if (!data || !data.user) return null;
  // console.log('User logged in:', data.user);
  return data;
};


interface RegisterResponse {
  user: UserProfile;
  message?: string;
}

export const register = async (
  fullName: string,
  email: string,
  password: string,
  role = 'Learner'
): Promise<RegisterResponse> => {
  const data = (await fetchClient.post(
    '/api/users/register',
    { fullName, email, password, role }
  )) as RegisterResponse;
  return data;
};


export const logout = async () => {
  await fetchClient.post('/api/users/logout');
};
