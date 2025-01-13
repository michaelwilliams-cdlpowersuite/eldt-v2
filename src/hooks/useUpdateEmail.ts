import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import {resendVerificationEmail, updateEmail} from "../api/api";
import { snackOptions } from "../views/registration/utilities/snackOptions";
import { useMe } from "./useMe";

export const useUpdateEmail = (): UseMutationResult<any, Error, string, unknown> => {
  const { data: me } = useMe();
  const userId = me?.id;

  return useMutation({
    mutationFn: async (email: string) => {
      if (!userId) {
        throw new Error("User ID is not available.");
      }
      return await updateEmail(userId, email);
    },
    onSuccess: () => {
      enqueueSnackbar("Email updated successfully!", snackOptions("success"));
      if(userId){
        resendVerificationEmail(userId);
      }
    },
    onError: (error) => {
      enqueueSnackbar(
          "An error occurred while updating the email.",
          snackOptions("error")
      );
    },
  });
};
