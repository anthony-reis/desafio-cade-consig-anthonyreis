import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/auth-session";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { DecodedToken } from "@/lib/types/decodedToken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data } = await axios.post("http://localhost:3000/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const accessToken = data.access_token;

    const decoded = jwtDecode<DecodedToken>(accessToken);

    const session = await getSession();
    session.userId = decoded.sub;
    session.usuario = decoded.usuario;
    session.accessToken = accessToken;
    session.isLoggedIn = true;

    await session.save();

    return NextResponse.json({
      success: true,
      user: {
        id: decoded.sub,
        usuario: decoded.usuario,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}
