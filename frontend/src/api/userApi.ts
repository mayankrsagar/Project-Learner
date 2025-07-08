// src/api/courseApi.ts
import axiosClient from './axiosClient';

export const fetchMe = async () => {
  const { data } = await axiosClient.get('/api/users/me');
  return data;
};
