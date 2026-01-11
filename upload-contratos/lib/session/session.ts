import { SessionOptions } from "iron-session";

export interface SessionData {
  userId: string;
  usuario: string;
  accessToken: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "auth_session",
  ttl: 0,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: undefined,
    path: "/",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    userId?: string;
    usuario?: string;
    accessToken?: string;
    isLoggedIn?: boolean;
  }
}
