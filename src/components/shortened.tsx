"use server";

import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import { ShortLink } from "@/models/short-link";
import { ShortHit } from "@/models/short-hit";

export default async function ShortenedServer({
  shortened,
  addr,
}: { shortened: string; addr: string }) {
  await connectToDatabase();

  const link = await ShortLink.findOne({ shortened }).lean();
  const addrRecord = await ShortHit.findOne({ addr }).lean();

  if (link?.original && !addrRecord) {
    await ShortHit.create({ addr, short_id: shortened });
    redirect(link.original);
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
