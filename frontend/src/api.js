import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend base URL
  withCredentials: true, // Include cookies for authentication
});

export default API;
