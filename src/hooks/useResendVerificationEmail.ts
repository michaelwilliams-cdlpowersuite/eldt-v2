import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { resendVerificationEmail } from "../api/api";
import { snackOptions } from "../views/registration/utilities/snackOptions";
import { useMe } from "./useMe";

export const useResendVerificationEmail = (): UseMutationResult<
  any,
  Error,
  void
> => {
  const { data: me } = useMe();
  const userId = me?.id;

  return useMutation<any, Error, void>({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("User ID is not available.");
      }
      return await resendVerificationEmail(userId);
    },

    onSuccess: () => {
      enqueueSnackbar(
        "Verification email resent successfully!",
        snackOptions("success")
      );
    },
    onError: (error) => {
      enqueueSnackbar(
        "An error occurred while resending the verification email.",
        snackOptions("error")
      );
    },
  });
};
