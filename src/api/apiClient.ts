import axios from "axios";
import {isTokenExpired} from "../hooks/useAuth";
import config from "../config";

const apiClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add a request interceptor to include the Auth token
apiClient.interceptors.request.use(
  async (config) => {
      const token = getAuthToken();
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export const getAuthToken = () => {
    try {
        const token = localStorage.getItem("apiToken");
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        if (isTokenExpired(token)) {
          throw new Error("Token expired.");
        }

        return token;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error retrieving auth token:", error.message);
        } else {
            console.error("Error retrieving auth token:", error);
        }
        return null;
    }
};

export default apiClient;
