import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { enqueueSnackbar } from "notistack";
import { snackOptions } from "../views/registration/utilities/snackOptions";

interface LoginVariables {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginVariables
> => {
  const navigate = useNavigate();
  const { setAuthentication } = useAuth();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthentication(data.accessToken);
      navigate("/", { replace: true });
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
