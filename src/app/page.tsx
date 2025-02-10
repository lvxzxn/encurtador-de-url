"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Scissors, Clipboard } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import * as z from "zod";

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
		toast.success(message, {
			description: `O link encurtado é: ${link}`,
			action: {
				label: "Acessar",
				onClick: () => window.open(link, "_blank"),
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
		event?.preventDefault();
		const request = await fetch("/api/short", {
			method: "POST",
			body: JSON.stringify({ original: data.url }),
			headers: { "Content-Type": "application/json" },
		});
		const response = await request.json();
		setShortenedUrl(response.shortened);

		if (toastId.current) {
			toast.dismiss(toastId.current);
		}

		successMessage(
			"URL encurtada com sucesso!",
			`/shortened/${response.shortened}`,
		);
	};

	const copyToClipboard = async () => {
		if (shortenedUrl) {
			await navigator.clipboard.writeText(
				`${window.location.origin}/shortened/${shortenedUrl}`,
			);
			toast.success("Link copiado para a área de transferência!", {
				duration: 3000,
				style: {
					background: "#28A745",
					color: "#F8FAFC",
					border: "none",
					padding: "12px",
				},
			});
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
					>
						<span>
							<Scissors />
						</span>
						Encurtar Link
					</Button>
				</form>

				{shortenedUrl && (
					<div className="flex flex-col items-center mt-4">
						<div className="flex items-center space-x-2">
							<p className="text-white font-semibold">
								<a
									href={`/shortened/${shortenedUrl}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									{`${window.location.origin}/shortened/${shortenedUrl}`}
								</a>
							</p>
							<Button
								onClick={copyToClipboard}
								className="p-2 bg-gray-700 text-white rounded"
							>
								<Clipboard size={20} />
							</Button>
						</div>
					</div>
				)}
			</section>
		</div>
	);
};

export default App;
