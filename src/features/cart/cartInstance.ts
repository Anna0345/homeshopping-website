// axiosInstance.ts

import axios from "axios";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

// Set the token in the headers for each request
instance.interceptors.request.use(
  async (config) => {
    const token = await storageSession.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
