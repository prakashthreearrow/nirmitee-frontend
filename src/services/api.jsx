import axios from "axios";
import { url, getLocalStorageItem } from "../utils/helper";

const api = axios.create({
  baseURL: url, // Ensure `url` is properly defined in your utils/helper file
});

api.interceptors.request.use(
  function (config) {
    const token = getLocalStorageItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle request error
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, // Simply returning the response object
  function (error) {
    // You can handle specific HTTP errors here, e.g., 401 Unauthorized
    if (error.response) {
      console.error("Response error:", error.response.status, error.response.data);
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
