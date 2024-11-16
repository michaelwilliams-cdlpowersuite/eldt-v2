import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginUser } from "../api/api";

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
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Handle success
      localStorage.setItem("authToken", data.token);
      console.log("Login successful!", data);
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
