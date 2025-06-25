"use client";

import ChatInput from "@/components/AIAssistance/ChatInput";
import ChatMessage from "@/components/AIAssistance/ChatMessage";
import GlobalLoader from "@/components/common/GlobalLoader";
import { useState, useRef } from "react";

type Message = { role: "student" | "ai"; content: string };

export default function ResearchAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "student", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: text, pdf_pages: pdfPages }),
      });

      const data = await res.json();
      const botMessage: Message = {
        role: "ai",
        content: data?.response || "❌ AI failed to respond.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "❌ API error!" }]);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    setLoading(true);
    const res = await fetch("http://localhost:8000/api/pdf-to-text", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPdfPages(data.pages || []);
    setMessages([{ role: "ai", content: "✅ PDF uploaded. Ask anything!" }]);
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 AI Research Assistant</h1>

      <div className="mb-4 flex items-center gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="h-[400px] overflow-y-auto border rounded-md p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && <GlobalLoader />}
      </div>

      <ChatInput onSend={sendMessage} />
    </main>
  );
}
