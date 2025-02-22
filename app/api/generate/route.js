import { StreamingTextResponse, LangChainStream } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
	const { prompt } = await req.json();

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: 'gpt-4-o',
			max_tokens: 1024,
			messages: [
				{
					role: 'user',
					content: `Generate JSX for: ${prompt}. Only return the JSX code, no explanations.`
				}
			],
			stream: true,
		}),
	});

	const stream = LangChainStream(response);
	return new StreamingTextResponse(stream);
}
