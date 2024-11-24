import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend base URL
  withCredentials: true, // Include cookies for authentication
});
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true; // For session-based auth


export default API;
