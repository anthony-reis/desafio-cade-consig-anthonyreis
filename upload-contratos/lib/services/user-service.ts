import { api } from "../api/client";
import { AuthResponse, LoginInput } from "../types/auth";
import { User } from "../types/user";

export const userService = {
  async login(credentials: LoginInput): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  async logout() {
    await api.post("/auth/logout");
  },
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await api.get("/auth/me");
      return data.user;
    } catch {
      return null;
    }
  },
};
