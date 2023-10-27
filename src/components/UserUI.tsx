import React, { useState } from "react";

function UserInputComponent() {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");

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
    <div className="flex flex-col items-center my-8">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your input here..."
        rows={4}
        className="w-4/5 p-4 border border-gray-300 rounded-md resize-y text-red-600" // Added text-red-600 for red text color
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>

      <div className="flex flex-col items-center mt-8 mb-4">
        <label className="mb-2 text-xl font-semibold text-gray-600">
          AI Output:
        </label>
        <div className="w-4/5 p-4 border border-gray-300 rounded-md bg-gray-100 text-red-600">
          {" "}
          {/* Added text-red-600 for red text color */}
          {output || "Waiting for input..."}
        </div>
      </div>
    </div>
  );
}

export default UserInputComponent;
