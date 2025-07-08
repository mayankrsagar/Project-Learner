import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_URL || '',
  withCredentials: true,
});

export default axiosClient;