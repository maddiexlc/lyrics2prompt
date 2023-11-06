// // /pages/api/output.js

// import { client } from "@/service/sanity";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, res: NextResponse) {
//   const session = await getServerSession(authOptions);
//   const userId = session?.user?.id; //

//   try {
//     const userId = "userId"; // Replace this with actual user ID retrieval logic
//     const query = `*[_type == "user" && _id == $userId]{chat}[0]`;
//     const params = { userId };
//     const chatHistory = await client.fetch(query, params);
//     console.log("res:", res);
//     res.status(200).json(chatHistory);
//   } catch (err) {
//     console.error("Error fetching chat history:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import { client } from "@/service/sanity";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Helper function to handle GET requests
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // Check if the session exists and has a user ID
  if (!session || !session.user || !session.user.name) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.name; // Use the user ID from the session

  try {
    const query = `*[_type == "user" && name == $userId]{chat}[0]`;
    const params = { userId };
    const chatHistory = await client.fetch(query, params);
    return new Response(JSON.stringify(chatHistory), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
