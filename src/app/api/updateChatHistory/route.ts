import { client } from "@/service/sanity";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.name; //

  try {
    // const userId = "userId"; // Replace this with actual user ID retrieval logic
    const rawData = await req.text();
    const parsedBody = JSON.parse(rawData);
    const { newChat } = parsedBody;

    if (!newChat) {
      return new Response("Invalid request body", { status: 400 });
    }

    const data = {
      _type: "user",
      _id: userId,
      name: userId,
      chat: newChat,
    };

    await client.createOrReplace(data);

    return new Response("Chat history updated", { status: 200 });
  } catch (err) {
    console.error("Error updating chat history:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
