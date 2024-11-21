import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signUpUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { snackOptions } from "../views/registration/utilities/snackOptions";

interface LoginVariables {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useSignUpMutation = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginVariables
> => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      localStorage.setItem("apiToken", data.accessToken);
      enqueueSnackbar("Sign up successful!", snackOptions("success"));
      navigate("/verify-email");
    },
    onError: (error) => {
      if (error instanceof Error && (error as any).response) {
        // Extract error message from response
        const serverError = (error as any).response.data;
        const message = serverError.message || "An unexpected error occurred";

        enqueueSnackbar(message, snackOptions("error"));
      } else {
        console.error("Unexpected error:", error);
        enqueueSnackbar("An unexpected error occurred", snackOptions("error"));
      }
    },
  });
};
