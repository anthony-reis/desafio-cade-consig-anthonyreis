import { useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/lib/services/user-service";
import { LoginInput } from "../types/auth";
import { toast } from "sonner";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      await userService.login(credentials);

      router.push("/");
      router.refresh();
      toast.success("Login realizado com sucesso!");
    } catch (err: any) {
      const message = err.response?.data?.error || "Credenciais inválidas";
      setError(message);
      toast.error("Erro ao fazer login: " + message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await userService.logout();
      router.push("/sign-in");
      router.refresh();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout.");
    }
  };

  return {
    login,
    logout,
    isLoading,
    error,
  };
}
