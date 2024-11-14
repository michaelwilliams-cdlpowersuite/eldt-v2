import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Google Auth token
apiClient.interceptors.request.use(
  async (config) => {
    // const token = getAuthToken(); // Retrieve the token from local storage in the future once that's available (using gapi library?)
    const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDEvYXBpL2xvZ2luIiwiaWF0IjoxNzMxNTI2ODk0LCJleHAiOjE3MzIzOTA4OTQsIm5iZiI6MTczMTUyNjg5NCwianRpIjoibFp5MXcxOWV4NFlmdG9tZiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.MVz7GjHBv6J2SCaXGuSseP88FRoa9mrWskQ21yZgb-U`; // TODO delete this line once we have a token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
