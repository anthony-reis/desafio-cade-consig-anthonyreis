import { getSession } from "@/lib/session/auth-session";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const { data, status } = await axios.post(
      "http://localhost:3000/contratos/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Erro na API route:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: "Erro ao fazer upload", details: error.response.data },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Erro ao fazer upload do arquivo" },
      { status: 500 }
    );
  }
}
