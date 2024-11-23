import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8001/api",
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

const getAuthToken = () => {
    try {
        const token = localStorage.getItem("apiToken");
        if (!token) {
            throw new Error("Token not found in localStorage.");
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
