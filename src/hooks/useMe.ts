import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/api";
import {User} from "../types/user";
import {getAuthToken} from "../api/apiClient";

export const useMe = () => {
  const enabled = getAuthToken() != null;
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: getMe,
    // retry: false, // no retry
    enabled
  });
};
