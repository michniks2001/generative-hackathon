import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
	try {
		const { mood } = await req.json();

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "system", content: "You are a frontend assistant using html and css. You will generate a user interface depending on how the user is feeling with different quotes, exercises, and games using html and inline css styles. create a grid with 4 different components. Component examples are: a heading that responds to the person's mood, a textbox for the user to write down their thoughts, a chatbot that the user can interact with and seek more advice, a meditation exercise the user can do to maybe redirect their focus, etc. only provide the code with no other messages or formatting. Put this into a div, with inline css."
				},
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

