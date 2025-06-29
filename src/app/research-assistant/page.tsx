"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "student" | "ai";
  content: string;
  timestamp: string;
  pageNumber?: number;
};

const STORAGE_KEY = "researchAssistantChatHistory";
const PAGES_KEY = "pdfPages";

export default function ResearchAssistant() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [pdfPages, setPdfPages] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(PAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [pdfName, setPdfName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateId = () =>
    Math.random().toString(36).slice(2) + Date.now().toString(36);

  const scrollToMessage = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setPdfName(file.name);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("http://127.0.0.1:8000/api/pdf-to-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process PDF");
      }

      const data = await response.json();

      if (!data.pages || !Array.isArray(data.pages)) {
        throw new Error("Invalid PDF data format received");
      }

      setPdfPages(data.pages);
      localStorage.setItem(PAGES_KEY, JSON.stringify(data.pages));
      setMessages([
        {
          id: generateId(),
          role: "ai",
          content: `✅ Successfully processed "${file.name}" (${data.pages.length} pages). Ask me anything!`,
          timestamp: new Date().toISOString(),
        },
      ]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setMessages([
        {
          id: generateId(),
          role: "ai",
          content: `❌ Failed to process PDF: ${err.message || "Unknown error"}`,
          timestamp: new Date().toISOString(),
        },
      ]);
      setPdfPages([]);
      setPdfName("");
      localStorage.removeItem(PAGES_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || pdfPages.length === 0) return;

    const userMessage: Message = {
      id: generateId(),
      role: "student",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: text, pdf_pages: pdfPages }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: generateId(),
        role: "ai",
        content: data.response || "❌ No response from AI",
        timestamp: new Date().toISOString(),
        pageNumber: data.page_number,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setError(err.message || "Error processing request");
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "ai",
          content: "❌ Error processing your request. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    const input = document.getElementById("chat-input") as HTMLInputElement | null;
    if (!input || !input.value.trim()) return;
    sendMessage(input.value.trim());
    input.value = "";
  };

  return (
    <div className="flex h-screen max-w-7xl mx-auto bg-gray-50 shadow-lg rounded-lg overflow-hidden">
      <aside className="w-72 bg-gray-900 text-gray-300 flex flex-col border-r border-gray-700">
        <header className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chat History</h2>
          <button
            title="Upload PDF"
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-400 hover:text-blue-500"
          >📁</button>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handlePdfUpload}
            disabled={loading}
          />
        </header>

        <div className="flex-1 overflow-y-auto p-2">
          {messages.length === 0 && <p className="text-gray-500 text-sm p-2">No chat history yet</p>}
          <ul className="space-y-1">
            {messages.filter((m) => m.role === "student").map((msg) => {
              const idx = messages.findIndex((m) => m.id === msg.id);
              const aiReply = messages.slice(idx + 1).find((m) => m.role === "ai");
              return (
                <li
                  key={msg.id}
                  className="cursor-pointer rounded px-3 py-2 hover:bg-gray-700"
                  onClick={() => scrollToMessage(msg.id)}
                  title={msg.content}
                >
                  <p className="truncate font-medium text-blue-400">{msg.content}</p>
                  {aiReply && <p className="text-xs text-gray-400 truncate mt-0.5">{aiReply.content}</p>}
                  <p className="text-xs text-gray-500 mt-0.5">{formatTimestamp(msg.timestamp)}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="p-4 text-xs text-gray-600 border-t border-gray-700">
          {pdfName ? `Loaded: ${pdfName}` : "Upload a PDF to start chatting"}
        </footer>
      </aside>

      <main className="flex flex-col flex-1 bg-white">
        <header className="p-6 border-b border-gray-300 text-gray-800 text-2xl font-bold flex items-center gap-3">
          <FileText className="text-blue-600" size={32} />
          AI Research Assistant
        </header>

        <section className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <FileText size={48} className="mb-4" />
              <p className="text-lg">Upload a PDF and start asking questions.</p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              id={msg.id}
              className={`max-w-[60%] p-4 rounded-xl break-words ${
                msg.role === "student"
                  ? "bg-blue-600 text-white ml-auto rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm select-none">
                  {msg.role === "student" ? "You" : "Assistant"}
                </span>
                {msg.pageNumber !== undefined && (
                  <span className="text-xs text-gray-500 select-none">
                    Page {msg.pageNumber + 1}
                  </span>
                )}
              </div>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <div className="text-xs text-gray-400 mt-1 select-none">
                {formatTimestamp(msg.timestamp)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none flex items-center gap-2">
                <Loader2 className="animate-spin text-blue-600" size={20} />
                <span>Assistant is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </section>

        <footer className="p-4 border-t border-gray-300">
          <div className="relative max-w-4xl mx-auto">
            <input
              id="chat-input"
              type="text"
              placeholder={
                pdfPages.length === 0
                  ? "Upload a PDF first to ask questions..."
                  : "Ask about the document..."
              }
              disabled={loading || pdfPages.length === 0}
              className="w-full rounded-md border border-gray-300 px-4 py-3 pr-14 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || pdfPages.length === 0}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              title="Send"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              )}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
