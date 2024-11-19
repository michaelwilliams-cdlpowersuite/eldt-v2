import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signUpUser } from "../api/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      localStorage.setItem("apiToken", data.accessToken);
      navigate("/verify-email");
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
