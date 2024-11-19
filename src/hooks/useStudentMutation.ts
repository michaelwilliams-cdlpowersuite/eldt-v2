import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { submitStepData } from "../api/api";
import { snackOptions } from "../views/registration/utilities/snackOptions";

export const useStudentMutation = (): UseMutationResult<
  any,
  Error,
  Record<string, any>
> => {
  return useMutation({
    mutationFn: async (stepData: Record<string, any>) => {
      return await submitStepData(stepData);
    },
    onSuccess: () => {
      enqueueSnackbar("Step completed successfully!", snackOptions("success"));
    },
    onError: (error) => {
      enqueueSnackbar(
        "An error occurred while submitting the data.",
        snackOptions("error")
      );
    },
  });
};
