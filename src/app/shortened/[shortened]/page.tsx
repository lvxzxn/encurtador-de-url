// app/shortened/[shortened]/page.tsx
"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import connectToDatabase from "@/lib/db";

import { ShortLink } from "@/models/short-link";
import { ShortHit } from "@/models/short-hit";

interface Props {
	params: Promise<{ shortened: string }>;
}

export default async function ShortenedPage({ params }: Props) {
	const { shortened } = await params;

	await connectToDatabase();

	const reqHeaders = headers();
	const address =
		(await reqHeaders).get("x-forwarded-for")?.split(",")[0].trim() ?? "127.0.0.1";

	const link = await ShortLink.findOne({ shortened });
  const ipHasDuplicated = await ShortHit.findOne({addr: address});
	if (link?.original && !ipHasDuplicated) {
		try {
			await ShortHit.create({ short_id: shortened, addr: address });
		} catch (error) {
			console.error("Erro ao registrar o hit:", error);
		}
	} else if (link?.original) {
    redirect(link.original);
  }

	return (
		<div className="flex h-screen items-center justify-center flex-col">
			<h1 className="text-2xl font-bold text-red-500">Link não encontrado!</h1>
			<p className="text-gray-400">
				Verifique se o URL encurtado está correto.
			</p>
		</div>
	);
}
