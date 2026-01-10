import { getSession } from "@/lib/session/auth-session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    // Pega o FormData com o arquivo
    const formData = await request.formData();

    // Faz upload para o backend NestJS
    const response = await fetch("http://localhost:3000/contratos/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Erro do backend:", error);
      return NextResponse.json(
        { error: "Erro ao fazer upload", details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Erro na API route:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload do arquivo" },
      { status: 500 }
    );
  }
}
