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
export const submitStepData = async (
  stepData: Record<string, any>,
  studentId: string
) => {
  const companyId = process.env.REACT_APP_DEFAULT_COMPANY_ID; // TODO: should this be hardcoded or come from me.companies[0].id?
  console.log("stepData", stepData);

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
  try {
    const response = await apiClient.post(
      "/login",
      { email, password },
      {
        // Override default headers for this request
        headers: {
          Authorization: undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Sign Up API
export const signUpUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const companyId = process.env.REACT_APP_DEFAULT_COMPANY_ID; // TODO: set env variables to correct values
  const studentType = "quiz"; // TODO: set to "quiz" for now
  const code = null; // TODO: Shrug

  try {
    const response = await apiClient.post(
      `/student-register`,
      { email, password, companyId, studentType, code },
      {
        // Override default headers for this request
        headers: {
          Authorization: undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Forgot Password API
export const forgotPassword = async ({ email }: { email: string }) => {
  const companyId = null; // TODO: make sure this is correct
  try {
    const response = await apiClient.post("/forgot-password", {
      email,
      companyId,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    throw error;
  }
};

// Me API
export const getMe = async () => {
  try {
    const response = await apiClient.get("user/me");
    return response.data;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};
