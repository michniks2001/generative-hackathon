import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { request } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a mental wellness assistant, and will assist with any questions or issues the user is having.",
        },
        { role: "user", content: request.message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const chatbotResponse = response.choices[0].message.content;
    return Response.json({ chatbotResponse });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json(
      { message: "Failed to generate UI." },
      { status: 500 }
    );
  }
}
