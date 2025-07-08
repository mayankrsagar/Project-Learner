import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_URL || 'https://project-learner.onrender.com/',
  withCredentials: true,
});

export default axiosClient;