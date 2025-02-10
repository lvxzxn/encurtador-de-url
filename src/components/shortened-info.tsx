"use server";


export default async function ShortenedInfoServer({ link_id }: { link_id: string }) {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-red-500">Link não encontrado!</h1>
      <p className="text-gray-400">Verifique se o URL encurtado está correto.</p>
    </div>
  );
}
