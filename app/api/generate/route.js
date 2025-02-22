import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const audioFiles = [
	{
		length: "15 minutes",
		embedCode: '<iframe src="https://drive.google.com/file/d/1ZTHiTs9lEpQ9X4urk40A2CGmDrWnbsLj/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: "3 minutes",
		embedCode: '<iframe src="https://drive.google.com/file/d/1YvidjoxjwulcZozSnL3wL7najK6r6v3u/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: "8 minutes",
		embedCode: '<iframe src="https://drive.google.com/file/d/1yaM_IyUszTpSvVgQLXT9GYLZ1TBXSlaZ/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: "20 minutes",
		embedCode: '<iframe src="https://drive.google.com/file/d/1kRhZ77FqW6fSBJ-xF6BpgW-UMTrHGM5r/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: '5 minutes',
		embedCode: '<iframe src="https://drive.google.com/file/d/1hOziUfUqsteyw3-ry-rJFcz9OffQq_3u/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: '10 minutes',
		embedCode: '<iframe src="https://drive.google.com/file/d/1T90L7ZtyO6oFrurFwo1Ke3v-2imLeBPi/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: '7 minutes',
		embedCode: '<iframe src="https://drive.google.com/file/d/17ilQ5Pv3kcORJSZybWa1gazyM5CMqdwn/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: '4 minutes',
		embedCode: '<iframe src="https://drive.google.com/file/d/1MSjsjiTjenCt2W5tZsEgsGTnO5VpalVa/preview" width="640" height="480" allow="autoplay"></iframe>'
	},
	{
		length: '10 minutes',
		embedCode: '<iframe src="https://drive.google.com/file/d/19ght3L31tO7YhknFSnW00LlXIlpeKelo/preview" width="640" height="480" allow="autoplay"></iframe>'
	}
]

games = [
	"https://cloud.onlinegames.io/games/2025/unity/voxel-world/index-og.html",
	"https://www.onlinegames.io/games/2023/q2/dinosaur-game/index.html",
	"https://www.onlinegames.io/games/2023/unity/hero-rush-tower-defense/index.html",
	"https://www.onlinegames.io/games/2023/unity/hero-rush-tower-defense/index.html",
	"https://www.onlinegames.io/games/2023/construct/234/among-impostor/index.html"
]

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

