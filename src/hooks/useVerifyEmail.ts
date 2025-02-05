import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { verifyEmail } from "../api/api";
import { enqueueSnackbar } from "notistack";
import { snackOptions } from "../views/registration/utilities/snackOptions";

interface VerifyEmailVariables {
  userId: number;
  token: string;
}

interface VerifyEmailResponse {
  success: boolean;
}

let hasShownEmailVerificationSuccess = false;

export const useVerifyEmail = (): UseMutationResult<
    VerifyEmailResponse,
    Error,
    VerifyEmailVariables
> => {
  return useMutation({
    mutationFn: verifyEmail,
    retry: false,
    onSuccess: (data) => {
      if (!hasShownEmailVerificationSuccess) {
        hasShownEmailVerificationSuccess = true;
        if (!data.success) {
          enqueueSnackbar("Email has been verified", snackOptions("success"));
        } else {
          enqueueSnackbar("Email verified!", snackOptions("success"));
        }
      }
    },
    onError: (error) => {
      enqueueSnackbar(
          "Email verification failed. Please check your email again.",
          snackOptions("error")
      );
      console.error(
          "Email failed to send. Please try again.",
          error instanceof Error ? error.message : error
      );
    },
  });
};
