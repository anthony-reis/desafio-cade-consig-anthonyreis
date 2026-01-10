import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "./session";

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return null;
  }

  return {
    userId: session.userId,
    usuario: session.usuario,
  };
}
