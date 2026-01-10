import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/auth-session";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  usuario: string;
  exp: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const data = await response.json();
    const accessToken = data.access_token;

    // Decodifica o token para pegar informações do usuário
    const decoded = jwtDecode<DecodedToken>(accessToken);

    // Salva na sessão (servidor)
    const session = await getSession();
    session.userId = decoded.sub;
    session.usuario = decoded.usuario;
    session.accessToken = accessToken; // ← Token fica APENAS no servidor
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
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}
