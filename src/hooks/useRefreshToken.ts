import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { refreshToken } from "../api/api";
import { enqueueSnackbar } from "notistack";
import { snackOptions } from "../views/registration/utilities/snackOptions";

interface RefreshTokenResponse {
  token: string;
}

export const useRefreshTokenMutation = (
  setAuthentication: (token: string) => void
): UseMutationResult<RefreshTokenResponse, Error, void> => {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      setAuthentication(data.accessToken);
      console.info("Token refreshed");
    },
    onError: (error) => {
      if (error instanceof Error && (error as any).response) {
        const serverError = (error as any).response.data;
        const message = serverError.message || "Failed to refresh session";

        enqueueSnackbar(message, snackOptions("error"));
      } else {
        console.error("Unexpected error:", error);
        enqueueSnackbar("An unexpected error occurred", snackOptions("error"));
      }
    },
  });
};
