import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req) {
	try {
		const { mood } = await req.json();

		if (!mood) {
			return new Response(JSON.stringify({ error: "Mood is required." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "system",
					content: [
						{
							type: "text",
							text: "You are a frontend assistant using Next.js. You will generate a user interface depending on how the user is feeling with different quotes, exercises, and games using JSX with Tailwind and ShadCN.\n\nOnly provide the code with no other messages or formatting."
						}
					]
				},
				{
					role: "user",
					content: [
						{
							type: "text",
							text: `I am feeling ${mood}`
						}
					]
				}
			],
			response_format: { type: "text" },
			temperature: 1,
			max_tokens: 2048,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0
		});

		const generatedCode = response.choices?.[0]?.message?.content?.trim();

		return new Response(JSON.stringify({ code: generatedCode }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error generating code:", error);
		return new Response(JSON.stringify({ error: "Failed to generate JSX code." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

