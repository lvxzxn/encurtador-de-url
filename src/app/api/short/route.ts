"use server";

import { randomUUID } from "node:crypto";
import { ShortLink } from "@/models/short-link"; 
import { type NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db"; 

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { original } = await req.json();

    if (!original) {
      return NextResponse.json(
        { error: "URL original é obrigatória" },
        { status: 400 }
      );
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "Desconhecido";
    const shortId = randomUUID().substring(2, 8);

    const shortenedLink = await ShortLink.create({
      original, 
      shortened: shortId, 
      addr: ip,
    });

    const responseShortened = {
      original: shortenedLink.original,
      shortened: shortenedLink.shortened,
    };

    return NextResponse.json(responseShortened, { status: 201 });
  } catch (error) {
    console.error("Erro ao encurtar URL:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
