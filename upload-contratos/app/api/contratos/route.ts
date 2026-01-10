import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/auth-session";

export async function GET(request: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = `http://localhost:3000/contratos${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar contratos" },
      { status: 500 }
    );
  }
}
