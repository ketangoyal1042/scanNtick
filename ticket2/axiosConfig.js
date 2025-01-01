import store from "@/store";
import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
  //   baseURL: "http://192.168.31.126:5000",
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const auth = store.getState().auth;
    if (auth.token) {
      config.headers.Authorization = `${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
