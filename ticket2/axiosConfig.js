import axios from "axios";

const api = axios.create({
//   baseURL: "http://192.168.31.126:5000",
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;