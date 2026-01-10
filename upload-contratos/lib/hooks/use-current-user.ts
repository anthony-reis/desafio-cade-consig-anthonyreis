import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface User {
  id: string;
  usuario: string;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data.user as User;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
