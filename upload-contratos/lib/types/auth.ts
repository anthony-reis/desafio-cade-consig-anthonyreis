import { z } from "zod";
export const loginSchema = z.object({
  user: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export type AuthResponse = {
  access_token: string;
};
