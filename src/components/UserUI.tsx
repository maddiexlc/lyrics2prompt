import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function UserInputComponent() {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("Waiting for response..");

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch("/api/input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: userInput }),
    })
      .then((res) => res.json())
      .then((data) => setOutput(data.response)) // assuming the API response has a 'response' field
      .catch((error) => setOutput("An error occurred: " + error.message));
  };

  return (
    <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-10 grid-cols-1 items-end">
      <div className="rounded-lg border border-[#00f5a0] p-4">
        <p className="text-lg">{output}</p>
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
