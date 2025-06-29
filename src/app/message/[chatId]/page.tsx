"use client";

import React, { useEffect, useRef } from "react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import MessageInput from "@/components/chat/MessageInput";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  
  chatApi,
  useGetChatsQuery,
} from "@/redux/features/chat/chat.api";
import { useAppSelector } from "@/redux/hook";
import { TMessage } from "@/types/chat.type";
import { Loader, ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";

export default function ChatDetailPage() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const user = useAppSelector(selectCurrentUser);
  const senderId = user?.userId;

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chat, isLoading: chatLoading } = useGetChatsQuery(chatId);
  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(chatId, { pollingInterval: 5000 });

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Safely find the receiver participant
  const receiver = chat?.participants?.find((p) => p._id !== senderId);

  // Fallback UI if no receiver found or chat missing
  if (chatLoading || isMessagesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-indigo-600" />
      </div>
    );
  }

  if (!chat || !receiver) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-center px-4">
          Chat or participants not found. Please go back and try again.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSend = async (text: string) => {
    if (!chatId || !text.trim() || !senderId || !receiver?._id) return;

    const tempMessage: TMessage = {
      _id: `temp-${Date.now()}`,
      chatId,
      senderId,
      receiverId: receiver._id,
      text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(
      chatApi.util.updateQueryData("getMessages", chatId, (draft) => {
        if (!draft) return;
        draft.push(tempMessage);
      })
    );

    try {
      await sendMessage({ chatId, senderId, receiverId: receiver._id, text }).unwrap();
      refetchMessages();
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border rounded-lg shadow-lg bg-white">
      {/* Header with back button */}
      <header className="flex items-center border-b px-6 py-3 bg-indigo-50 sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="mr-4 text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-indigo-900 truncate">
          {receiver.name || "User"}
        </h1>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No messages yet. Say hello!</p>
        )}
        {messages.map((msg: TMessage) => (
          <MessageBubble
            key={msg._id}
            text={msg.text}
            isSender={msg.senderId === senderId}
            timestamp={msg.createdAt}
          />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="border-t px-6 py-4 bg-white sticky bottom-0">
        <MessageInput
          receiverId={receiver._id}
          senderId={senderId!}
          onSend={handleSend}
          isSending={isSending}
          placeholder="Type your message..."
          disabled={isSending}
        />
      </footer>
    </div>
  );
}
