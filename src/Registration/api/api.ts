import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
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

// Student API
export const submitStepData = async (stepData: Record<string, any>) => {
  const companyId = "1"; // TODO: change to 22, for now I'm getting 403 forbidden
  const studentId = "1"; // TODO: grab this somehow from sign up process

  try {
    const response = await apiClient.patch(
      `/companies/${companyId}/students/${studentId}`,
      stepData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting step data:", error);
    throw error;
  }
};

// Login API
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/login", {
    email,
    password,
  });
  return response.data;
};
