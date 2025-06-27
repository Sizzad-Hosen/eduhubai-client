import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [input, setInput] = useState("");

  console.log("ChatInput component rendered", input);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border p-2 rounded-md"
        placeholder="Ask your research question..."
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Send</button>
    </form>
  );
}
