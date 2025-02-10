import { type NextRequest, NextResponse } from "next/server";
import { ShortLink } from "@/models/short-link"; // Certifique-se de que o caminho do modelo está correto
import connectToDatabase from "@/lib/db"; // Função para conectar ao MongoDB

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase(); // Garante que a conexão com o banco está ativa

    const url = new URL(req.url);
    const shortId = url.searchParams.get("id");

    if (!shortId) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }

    const link = await ShortLink.findOne({ shortened: shortId });

    if (!link) {
      return NextResponse.json({ error: "URL não encontrada" }, { status: 404 });
    }

    return NextResponse.redirect(link.original);
  } catch (error) {
    console.error("Erro ao buscar a URL encurtada:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
