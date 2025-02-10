import { type NextRequest, NextResponse } from "next/server";
import { ShortLink } from "@/models/short-link"; 
import connectToDatabase from "@/lib/db"; 

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase(); 

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
