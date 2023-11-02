// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import useSWR from "swr";

// function UserInputComponent() {
//   const [userInput, setUserInput] = useState("");
//   const [output, setOutput] = useState("Waiting for response..");

//   const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     fetch("/api/input", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userInput: userInput }),
//     })
//       .then((res) => res.json())
//       .then((data) => setOutput(data.response)) // assuming the API response has a 'response' field
//       .catch((error) => setOutput("An error occurred: " + error.message));

//     useSWR()
//   };

//   return (
//     <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-10 grid-cols-1 items-end">
//       <div className="rounded-lg border border-[#00f5a0] p-4">
//         <p className="text-lg">{output}</p>
//       </div>
//       <form className="flex gap-2">
//         <Input
//           className="flex-grow rounded-lg border border-[#00f5a0] p-2"
//           placeholder="Type your message here..."
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         />
//         <Button
//           className="border-[#00f5a0] text-[#00f5a0]"
//           variant="secondary"
//           onClick={handleSubmit}
//         >
//           Send
//         </Button>
//       </form>
//     </main>
//   );
// }

// export default UserInputComponent;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSWR, { mutate } from "swr";

// Utility function to truncate text to a certain number of characters
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(text.length - maxLength);
};

function UserInputComponent() {
  const [userInput, setUserInput] = useState("");
  const { data: chatHistory, error } = useSWR("/api/output");

  const formattedChatHistory = chatHistory
    ? chatHistory.split("\n").map((line, index) => <p key={index}>{line}</p>)
    : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Step 1: Send the user input to the server
      const res = await fetch("/api/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!res.ok) {
        throw new Error(`Network response was not ok ${res.statusText}`);
      }

      const data = await res.json();
      const newUserMessage = `User: ${userInput}\n`;
      const newOpenAIMessage = `OpenAI: ${data.response}\n\n`; // Added an extra line break
      const newChat = truncateText(
        chatHistory + newUserMessage + newOpenAIMessage,
        500
      ); // Example max length of 2000 characters

      // Step 2: Update the chat history in Sanity
      await fetch("/api/updateChatHistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newChat }),
      });

      // Step 3: Re-fetch the chat history to reflect the update
      mutate("/api/output");

      // Clear the user input field
      setUserInput("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (error) return <div>Failed to load chat history</div>;
  if (!chatHistory) return <div>Loading...</div>;

  return (
    <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-10 grid-cols-1 items-end">
      <div className="rounded-lg border border-[#00f5a0] p-4">
        {formattedChatHistory}
      </div>
      <form className="flex gap-2">
        <Input
          className="flex-grow rounded-lg border border-[#00f5a0] p-2"
          placeholder="Type your message here..."
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          className="border-[#00f5a0] text-[#00f5a0]"
          variant="secondary"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </main>
  );
}

export default UserInputComponent;
