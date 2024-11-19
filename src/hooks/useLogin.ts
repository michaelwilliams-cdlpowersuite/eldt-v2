import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Handle success
      localStorage.setItem("apiToken", data.accessToken);
      navigate("/", { replace: true });
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
