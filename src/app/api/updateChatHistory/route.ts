// /pages/api/updateChatHistory.js
import { client } from "@/service/sanity";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; //

  if (req.method === "POST") {
    try {
      const userId = "userId"; // Replace this with actual user ID retrieval logic
      const { newChat } = req.body;

      if (!newChat) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const data = {
        _type: "user",
        _id: userId,
        chat: newChat,
      };

      await client.createOrReplace(data);

      res.status(200).json({ message: "Chat history updated" });
    } catch (err) {
      console.error("Error updating chat history:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
