import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const rawData = await req.text();
  const parsedBody = JSON.parse(rawData);
  const { userInput } = parsedBody;

  if (typeof userInput !== "string") {
    return new Response("Invalid userInput", { status: 400 });
  }

  try {
    const startTime = Date.now();

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Use the latest GPT model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userInput },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SIDNEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const endTime = Date.now();
    console.log(`OpenAI API call took ${endTime - startTime}ms`);

    const responseText = openaiResponse.data.choices[0]?.message.content.trim();
    return NextResponse.json({ response: responseText }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching response from OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
}
