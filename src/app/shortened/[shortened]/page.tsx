"use server";

import ShortenedServer from "@/components/shortened";
import { headers } from "next/headers";

export default async function ShortenedPage({
  params,
}: {
  params: Promise<{ shortened: string }>;
}) {
  const { shortened } = await params;
  const address =
    (await headers()).get("x-forwarded-for") ?? "127.0.0.1".split(",")[0];

  return <ShortenedServer shortened={shortened} addr={address} />;
}
