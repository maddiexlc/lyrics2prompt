// /pages/api/output.js

import { client } from "@/service/sanity";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const userId = "userId"; // Replace this with actual user ID retrieval logic
      const query = `*[_type == "user" && _id == $userId]{chat}[0]`;
      const params = { userId };
      const chatHistory = await client.fetch(query, params);

      res.status(200).json(chatHistory);
    } catch (err) {
      console.error("Error fetching chat history:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
