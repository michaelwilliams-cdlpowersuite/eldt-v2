import apiClient from './apiClient';

// Student API
export const submitStepData = async (
  stepData: Record<string, any>,
  studentId: number
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

// Update Email API
export const updateEmail = async (userId: number) => {
  const companyId = process.env.REACT_APP_DEFAULT_COMPANY_ID; // TODO: set env variables to correct values
  const locationId = 0; // TODO: set to 0 for now
  try {
    const response = await apiClient.patch(
      `https://api.cdlpowersuite.com/api/companies/${companyId}/locations/${locationId}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

// Resend Verification Email API
export const resendVerificationEmail = async (userId: number) => {
  const companyId = process.env.REACT_APP_DEFAULT_COMPANY_ID; // TODO: set env variables to correct values
  try {
    const response = await apiClient.patch(
      `/companies/${companyId}/users/${userId}/resend-verification-email`
    );
    return response.data;
  } catch (error) {
    console.error("Error resending verification email:", error);
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
