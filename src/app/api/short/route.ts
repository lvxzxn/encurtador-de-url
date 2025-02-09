"use server";

import { prisma } from "@/lib/db";
import { randomUUID } from "node:crypto";
import type { ResponseShortenedLink } from "@/types/shortened.response";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
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

		const shortenedLink = await prisma.shortLink.create({
			data: {
				addr: ip,
				original,
				shortened: shortId,
			},
		});

		const responseShortened: ResponseShortenedLink = {
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
