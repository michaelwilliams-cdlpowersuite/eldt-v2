import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { submitStepData } from "../api/api";
import { snackOptions } from "../views/registration/utilities/snackOptions";
import { useMe } from "./useMe";

export const useStudentMutation = (): UseMutationResult<
  any,
  Error,
  Record<string, any>
> => {
  const { data: me } = useMe();
  const studentId = me?.student?.id;
  return useMutation({
    mutationFn: async (stepData: Record<string, any>) => {
      if (!studentId) {
        return;
      }

      return await submitStepData(stepData, studentId);
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
