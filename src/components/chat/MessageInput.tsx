"use client";

import React, { useState } from "react";

type MessageInputProps = {
  senderId: string;
  receiverId: string;
  onSend: (text: string) => void;
  isSending: boolean;
};

export default function MessageInput({ onSend, isSending }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-grow border rounded px-3 py-2"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSending}
      />
      <button type="submit" disabled={isSending} className="bg-blue-600 text-white px-4 rounded">
        Send
      </button>
    </form>
  );
}
