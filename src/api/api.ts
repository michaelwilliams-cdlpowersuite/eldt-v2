import apiClient from "./apiClient";
import config from "../config";
import * as Sentry from "@sentry/react";

// Student API
export const submitStepData = async (
  stepData: Record<string, any>,
  studentId: number
) => {
  const companyId = config.defaultCompanyId;

  try {
    const response = await apiClient.patch(
      `/companies/${companyId}/students/${studentId}`,
      stepData
    );
    return response.data;
  } catch (error) {
    // @ts-ignore
    if (error?.response?.status !== 422) {
      Sentry.captureException(error);
    }

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
    // @ts-ignore
    if (error?.response?.status !== 401) {
      Sentry.captureException({error: error, email: email});
      console.error("Error logging in:", error);
      throw error;
    }
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
  const companyId = config.defaultCompanyId;
  const studentType = "quiz"; // TODO: set to "quiz" for now
  const code = null; // TODO: Shrug

  try {
    const response = await apiClient.post(
      `/student-register`,
      { email, password, companyId, studentType, code, source: 'react-registrations' },
      {
        // Override default headers for this request
        headers: {
          Authorization: undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    Sentry.captureException({ error: error, email: email });
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
    Sentry.captureException({ error: error, email: email });
    console.error("Error sending forgot password email:", error);
    throw error;
  }
};

// Update Email API
export const updateEmail = async (userId: number, email: string) => {
  const companyId = config.defaultCompanyId;
  const locationId = 0; // TODO: set to 0 for now
  try {
    const response = await apiClient.patch(
      `/companies/${companyId}/locations/${locationId}/users/${userId}`,
        { email }
    );
    return response.data;
  } catch (error) {
    Sentry.captureException({ error: error, userId: userId });
    console.error("Error updating email:", error);
    throw error;
  }
};

// Resend Verification Email API
export const resendVerificationEmail = async (userId: number) => {
  const companyId = config.defaultCompanyId;
  try {
    const response = await apiClient.patch(
      `/companies/${companyId}/users/${userId}/resend-verification-email`
    );
    return response.data;
  } catch (error) {
    Sentry.captureException({ error: error, userId: userId });
    console.error("Error resending verification email:", error);
    throw error;
  }
};

// Refresh Token API
export const refreshToken = async () => {
  try {
    const response = await apiClient.post("/refresh-token", null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    Sentry.captureException(error);
    console.error("Failed to refresh token", error);
    throw error;
  }
};

export const verifyEmail = async ({
  userId,
  token,
}: {
  userId: number;
  token: string;
}) => {
  const companyId = config.defaultCompanyId;
  try {
    const response = await apiClient.post(
      `/companies/${companyId}/users/${userId}/email-verifications/?token=${token}`
    );
    return response.data;
  } catch (error) {
    Sentry.captureException({ error: error, userId: userId });
    console.error("Error verifying email:", error);
    throw error;
  }
};

// Me API
export const getMe = async () => {
  try {
    const response = await apiClient.get("user/me");
    return response.data;
  } catch (error) {
    // @ts-ignore
    if (error?.response?.status !== 401) {
      Sentry.captureException(error);
      console.error("Error getting user data:", error);
    }

    throw error;
  }
};

export const retrieveHandoff = async () => {
  try {
    const response = await apiClient.get("/eldt/retrieve-handoff", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    Sentry.captureException(error);
    console.error("Failed to obtain handoff information", error);
    throw error;
  }
};

export const prepareHandoff = async () => {
  try {
    const response = await apiClient.post("/eldt/authenticated-handoff");
    return response.data;
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error handing off to Angular App:", error);
    throw error;
  }
};
