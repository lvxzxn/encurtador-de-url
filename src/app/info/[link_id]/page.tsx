import ShortenedInfoServer from "@/components/shortened-info";

interface Props {
  params: { link_id: string };
}

export default function ShortenedInfoPage({ params }: Props) {
  return <ShortenedInfoServer link_id={params.link_id} />;
}
