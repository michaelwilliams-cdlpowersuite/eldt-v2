import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/api";
import {User} from "../types/user";

export const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
