import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { updateEmail } from "../api/api";
import { snackOptions } from "../views/registration/utilities/snackOptions";
import { useMe } from "./useMe";

export const useUpdateEmail = (): UseMutationResult<any, Error, void> => {
  const { data: me } = useMe();
  const userId = me?.id;

  return useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("User ID is not available.");
      }
      return await updateEmail(userId);
    },
    onSuccess: () => {
      enqueueSnackbar("Email updated successfully!", snackOptions("success"));
    },
    onError: (error) => {
      enqueueSnackbar(
        "An error occurred while updating the email.",
        snackOptions("error")
      );
    },
  });
};
