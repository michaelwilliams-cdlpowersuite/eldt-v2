import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/api";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
