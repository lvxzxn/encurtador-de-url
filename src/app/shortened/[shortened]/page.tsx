import ShortenedServer from "@/components/shortened-server";

interface Props {
  params: { shortened: string };
}

export default function ShortenedPage({ params }: Props) {
  return <ShortenedServer shortened={params.shortened} />;
}
