import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signUpUser } from "../api/api";

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
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Handle success
      //TODO Figure out the flow after sign up
      console.log("sign up success");
    },
    onError: (error) => {
      // Handle error
      console.error(
        "Login failed!",
        error instanceof Error ? error.message : error
      );
    },
  });
};
