import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const audioFiles = [
  {
    length: "15 minutes",
    link: "https://drive.google.com/file/d/1ZTHiTs9lEpQ9X4urk40A2CGmDrWnbsLj/preview",
  },
  {
    length: "3 minutes",
    link: "https://drive.google.com/file/d/1YvidjoxjwulcZozSnL3wL7najK6r6v3u/preview",
  },
  {
    length: "8 minutes",
    link: "https://drive.google.com/file/d/1yaM_IyUszTpSvVgQLXT9GYLZ1TBXSlaZ/preview",
  },
  {
    length: "20 minutes",
    link: "https://drive.google.com/file/d/1kRhZ77FqW6fSBJ-xF6BpgW-UMTrHGM5r/preview",
  },
  {
    length: "5 minutes",
    link: "https://drive.google.com/file/d/1hOziUfUqsteyw3-ry-rJFcz9OffQq_3u/preview",
  },
  {
    length: "10 minutes",
    link: "https://drive.google.com/file/d/1T90L7ZtyO6oFrurFwo1Ke3v-2imLeBPi/preview",
  },
  {
    length: "7 minutes",
    link: "https://drive.google.com/file/d/17ilQ5Pv3kcORJSZybWa1gazyM5CMqdwn/preview",
  },
  {
    length: "4 minutes",
    link: "https://drive.google.com/file/d/1MSjsjiTjenCt2W5tZsEgsGTnO5VpalVa/preview",
  },
  {
    length: "10 minutes",
    link: "https://drive.google.com/file/d/19ght3L31tO7YhknFSnW00LlXIlpeKelo/preview",
  },
];

const games = [
  "https://cloud.onlinegames.io/games/2025/unity/voxel-world/index-og.html",
  "https://www.onlinegames.io/games/2023/q2/dinosaur-game/index.html",
  "https://www.onlinegames.io/games/2023/unity/hero-rush-tower-defense/index.html",
  "https://www.onlinegames.io/games/2023/unity/hero-rush-tower-defense/index.html",
  "https://www.onlinegames.io/games/2023/construct/234/among-impostor/index.html",
];

const make_prompt = (args) => {
  return `You are a mental wellness assistant. Your job is to determine how negative or positive the user feels and provide the correct analysis on their mood.
	Depending on their negativity levels (0-10, where 0 is they are not negative and 10 is severely negative, chose an audio embed based on their negativity level. If their negativity levels are above a 3, here are your options in json format:
	${JSON.stringify(audioFiles)}
	The higher the score, the longer the audio should be with respect to the score.

	If their negativity levels are below a 2, choose a game from the array: ${games}.

	provide your output in the json format below (do not provide any explanations):

	{
		negativity_score: int,
		meditation_audio: null if negativity_score < 3 else string,
		video_game: null if negativity_score >= 3 else string,
		summary_of_state: string, // this is you summarizing how the client is feeling
		motivational_quote: string,
	}
	`;
};
export async function POST(req) {
  try {
    const { mood } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: make_prompt(),
        },
        { role: "user", content: `I am feeling ${mood}` },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generatedCode = response.choices[0].message.content
      .replace("```json", "")
      .replace("```", "");

    return Response.json({ generatedCode });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json(
      { message: "Failed to generate UI." },
      { status: 500 }
    );
  }
}
