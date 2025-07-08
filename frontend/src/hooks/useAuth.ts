import { mutate } from 'swr';

import {
  login,
  logout,
  register,
} from '../api/authApi';

export const useRegister = () => {
  const registerUser = async (fullName: string, email: string, password: string) => {
    const res = await register(fullName, email, password);
    await mutate('me');
    return res;
  };
  return { registerUser };
};

export const useLogin = () => {
  const loginUser = async (email: string, password: string) => {
    const res = await login(email, password);
    await mutate('me');
    return res;
  };
  return { loginUser };
};

export const useLogout = () => {
  const logoutUser = async () => {
    await logout();
    mutate('me', null);
  };
  return { logoutUser };
};