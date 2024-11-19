import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { forgotPassword } from "../api/api";
import { snackOptions } from "../Registration/utilities/snackOptions";

interface ForgotPasswordVariables {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
}

export const useForgotPasswordMutation = (): UseMutationResult<
  ForgotPasswordResponse,
  Error,
  ForgotPasswordVariables
> => {
  //todo enqueue toast

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      // Handle success
      if (!data.success) {
        enqueueSnackbar(
          "Email failed to send. Please try again.",
          snackOptions("error")
        );
      } else {
        enqueueSnackbar("Email sent!", snackOptions("success"));
      }
    },
    onError: (error) => {
      // Handle error
      console.error(
        "Email failed to send. Please try again.",
        error instanceof Error ? error.message : error
      );
    },
  });
};
