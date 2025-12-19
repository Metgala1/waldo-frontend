import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getImages = () => API.get('/images');
export const submitScore = (score) => API.post('/scores', score);

export default API;
