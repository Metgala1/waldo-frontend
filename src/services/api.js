import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
})

export const getImages = () => API.get('/images');

export default API