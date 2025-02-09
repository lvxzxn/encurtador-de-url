import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  console.log(url);
  const shortId = url.searchParams.get("id");

  if (!shortId) {
    return NextResponse.json({ error: "ID não informado" }, { status: 400 });
  }

  const link = await prisma.shortLink.findUnique({
    where: { shortened: shortId },
  });

  if (!link) {
    return NextResponse.json({ error: "URL não encontrada" }, { status: 404 });
  }

  return NextResponse.redirect(link.original);
}
