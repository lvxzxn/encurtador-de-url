"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { MoveRight, Scissors } from "lucide-react";

import * as z from "zod";

import { useRef, useState } from "react";
import type { ResponseShortenedLink } from "@/types/shortened.response";

import { toast } from "sonner";

const schema = z.object({
	url: z
		.string()
		.url({ message: "Digite uma url válida." })
		.nonempty()
		.toLowerCase(),
});

type Schema = z.infer<typeof schema>;

const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	});
	const [shortenedUrl, setShortenedUrl] = useState("");
	const toastId = useRef<string | null>(null);

	const successMessage = (message: string, link: string) => {
		toast.success("URL encurtada com sucesso!", {
			description: "Clique para acessar o link",
			action: {
				label: "Acessar",
				onClick: () => window.open(`${link}`, "_blank"),
			},
			duration: 5000,
			style: {
				background: "#181818",
				color: "white",
				border: "none",
				padding: "12px",
			},
		});
	};

	const onSubmit = async (data: Schema) => {
		const request = await fetch("/api/short", {
			method: "POST",
			body: JSON.stringify({ original: data.url }),
			headers: { "Content-Type": "application/json" },
		});
		const response: ResponseShortenedLink = await request.json();
		setShortenedUrl(response.shortened);

		if (toastId.current) {
			toast.dismiss(toastId.current);
			successMessage("URL encurtada com sucesso!", `/shortened/${shortenedUrl}`);
		}
	};

	return (
		<div className="grid min-h-screen justify-center place-items-center">
			<section className="form">
				<h1 className="text-white text-3xl font-bold mb-2">
					Encurtador de URL
				</h1>
				<form className="mt-2 mb-2" onSubmit={handleSubmit(onSubmit)}>
					{errors.url && (
						<p className="text-red-500 mb-2">{errors.url.message}</p>
					)}
					<Input
						{...register("url")}
						className="bg-[#181818] border-none mb-4 text-white font-bold"
						placeholder="https://google.com/xxx..."
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full font-bold"
						onClick={() =>
							successMessage(
								"URL encurtada com sucesso!",
								`/shortened/${shortenedUrl}`,
							)
						}
					>
						<span>
							<Scissors />
						</span>
						Encurtar Link
					</Button>
				</form>
			</section>
		</div>
	);
};

export default App;
