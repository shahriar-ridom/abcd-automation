"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get("userInput") as string;

    try {
      const response = await fetch("/api/automate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: input }),
      });
      const result = await response.json();
      setResult(result.content.output.kwargs.content);
      console.log(result.content.output.kwargs.content);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Submit Your Request
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="userInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Input
              </label>
              <input
                type="text"
                id="userInput"
                name="userInput"
                required
                className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Submit Request
            </button>
          </form>
          <p className="mt-4 text-black">{result}</p>
        </div>
      </div>
    </div>
  );
}
