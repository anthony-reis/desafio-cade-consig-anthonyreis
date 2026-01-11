import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/auth-session";
import axios from "axios";

export async function GET(request: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const params = Object.fromEntries(request.nextUrl.searchParams);

  try {
    const { data, status } = await axios.get(
      "http://localhost:3000/contratos",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        params,
      }
    );

    return NextResponse.json(data, { status });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { error: "Erro ao buscar contratos" },
      { status: 500 }
    );
  }
}
