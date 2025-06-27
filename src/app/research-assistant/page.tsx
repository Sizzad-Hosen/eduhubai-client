"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, Loader2, AlertCircle } from "lucide-react";

type Message = { 
  role: "student" | "ai"; 
  content: string;
  timestamp?: Date;
  pageNumber?: number;
};

export default function ResearchAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [pdfName, setPdfName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || pdfPages.length === 0) return;

    const userMessage: Message = { 
      role: "student", 
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user_input: text, 
          pdf_pages: pdfPages 
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        role: "ai",
        content: data.response || "❌ No response from AI",
        timestamp: new Date(),
        pageNumber: data.page_number
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message);
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "❌ Error processing your request. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
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
      setMessages([{ 
        role: "ai", 
        content: `✅ Successfully processed "${file.name}" (${data.pages.length} pages). Ask me anything!`,
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.message);
      setMessages([{ 
        role: "ai", 
        content: `❌ Failed to process PDF: ${err.message}`,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 AI Research Assistant</h1>

      {/* PDF Upload Section */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Research PDF
        </label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            ref={fileInputRef}
            className="hidden"
            id="pdf-upload"
            disabled={loading}
          />
          <label
            htmlFor="pdf-upload"
            className={`flex-1 cursor-pointer py-2 px-4 rounded-md border ${
              loading ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"
            }`}
          >
            {pdfName || "Select PDF File"}
          </label>
          {loading && <Loader2 className="animate-spin text-blue-500" size={20} />}
        </div>
        {error && (
          <div className="mt-2 flex items-center text-red-500 text-sm">
            <AlertCircle className="mr-1" size={16} />
            {error}
          </div>
        )}
      </div>

      {/* Document Status */}
      {pdfPages.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md flex items-center text-sm">
          <FileText className="text-blue-500 mr-2" size={18} />
          <span>Document loaded: {pdfPages.length} pages</span>
          {pdfName && <span className="ml-2 text-gray-600">({pdfName})</span>}
        </div>
      )}

      {/* Chat Area */}
      <div className="h-[400px] overflow-y-auto border rounded-md p-4 bg-white">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <FileText className="mb-2" size={24} />
            <p>Upload a PDF to start asking questions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "student" 
                      ? "bg-blue-100 text-blue-900" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="font-medium">
                    {msg.role === "student" ? "You" : "Assistant"}
                    {msg.pageNumber !== undefined && (
                      <span className="ml-2 text-xs text-gray-500">
                        (Page {msg.pageNumber + 1})
                      </span>
                    )}
                  </div>
                  <p className="mt-1">{msg.content}</p>
                  <div className="mt-1 text-xs text-gray-500">
                    {formatTimestamp(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-center">
                <div className="p-2 rounded-full bg-gray-100">
                  <Loader2 className="animate-spin text-blue-500" size={20} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder={pdfPages.length === 0 ? "Upload a PDF first..." : "Ask about the document..."}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            className="w-full p-3 border rounded-md pr-12"
            disabled={loading || pdfPages.length === 0}
          />
          <button
            onClick={() => {
              const input = document.querySelector("input[type='text']") as HTMLInputElement;
              if (input?.value) {
                sendMessage(input.value);
                input.value = "";
              }
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-500"
            disabled={loading || pdfPages.length === 0}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}