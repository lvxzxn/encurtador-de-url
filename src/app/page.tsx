"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { MoveRight, Scissors } from "lucide-react";

import * as z from "zod";

import { useState } from "react";
import type { ResponseShortenedLink } from "@/types/shortened.response";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
	const onSubmit = async (data: Schema) => {
		const request = await fetch("/api/short", {
			method: "POST",
			body: JSON.stringify({ original: data.url }),
			headers: { "Content-Type": "application/json" },
		});
		const response: ResponseShortenedLink = await request.json();
		console.log(response);
		setShortenedUrl(response.shortened);
	};
	return (
		<div className="grid min-h-screen justify-center place-items-center">
			<section className="form">
				<h1 className="text-white text-3xl font-bold mb-2">
					Encurtador de URL
				</h1>
				{shortenedUrl && (
					<div className="flex justify-center">
						<Badge variant={"default"} className="bg-green-500 w-full text-sm p-2">
							URL encurtada com sucesso!{" "}
							<Link
								href={`${window.location.origin}/shortened/${shortenedUrl}`}
								target="_blank"
							>
								<span className="flex text-white underline mx-2">
									Acessar <MoveRight className="text-blue-500" />
								</span>
							</Link>
						</Badge>
					</div>
				)}
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
			</section>
		</div>
	);
};

export default App;
