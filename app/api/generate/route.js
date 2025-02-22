/* import OpenAI from "openai";

console.log(process.env.OPENAI_API_KEY)
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
*/


// app/api/generate/route.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
	try {
		const { mood } = await req.json();

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{ role: "system", content: "You are a frontend assistant using HTML/CSS. Generate a div with inline css styles based on user mood. Only provide the generated code, no explanations. Just output raw code (no markdown)" },
				{ role: "user", content: `I am feeling ${mood}` },
			],
			temperature: 0.7,
			max_tokens: 500,
		});

		const generatedCode = response.choices[0].message.content.replace('```html', '').replace('```', '');
		
		console.log(generatedCode)
		return Response.json({ generatedCode });
	} catch (error) {
		console.error("OpenAI API error:", error);
		return Response.json({ message: "Failed to generate UI." }, { status: 500 });
	}
}

