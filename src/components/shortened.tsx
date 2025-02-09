"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ShortenedServer({
	shortened,
	addr,
}: { shortened: string; addr: string }) {
	const link = await prisma.shortLink.findUnique({
		where: { shortened: shortened },
	});
	const addrRecord = await prisma.shortHits.findUnique({
		where: { addr },
	});

	if (link?.original && !addrRecord) {
		await prisma.shortHits.create({
			data: {
				addr,
				short_id: shortened,
			},
		});
		redirect(link?.original);
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
