"use client";

import React, { useEffect, useRef } from "react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import MessageInput from "@/components/chat/MessageInput";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetChatByParticipantsMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  chatApi,
} from "@/redux/features/chat/chat.api";
import { useAppSelector } from "@/redux/hook";
import { TMessage } from "@/types/chat.type";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";

export default function ChatPage() {
  const params = useParams();
  const receiverId = params?.id as string | undefined;
  const user = useAppSelector(selectCurrentUser);
  const senderId = user?.userId;

  const dispatch = useDispatch<AppDispatch>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [getChat, { data: chat, isLoading: chatLoading }] =
    useGetChatByParticipantsMutation();

  const chatId = chat?._id || "";
  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(chatId, {
    skip: !chatId,
    pollingInterval: 5000,
  });

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (receiverId) {
      getChat(receiverId);
    }
  }, [receiverId, getChat]);

  const handleSend = async (text: string) => {
    if (!chatId || !text.trim() || !senderId || !receiverId) return;

    const tempMessage: TMessage = {
      _id: `temp-${Date.now()}`,
      chatId,
      senderId,
      receiverId,
      text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Optimistic UI update
    dispatch(
      chatApi.util.updateQueryData("getMessages", chatId, (draft) => {
        if (!draft) return;
        draft.push(tempMessage);
      })
    );

    try {
      await sendMessage({ chatId, senderId, receiverId, text }).unwrap();
      refetchMessages();
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  if (chatLoading || isMessagesLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="animate-spin w-10 h-10 text-indigo-600" />
        <span className="ml-3 text-indigo-600 font-medium">Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border rounded-lg shadow-lg bg-white">
      {/* Header */}
      <header className="flex items-center border-b px-6 py-3 bg-indigo-50 sticky top-0 z-10">
        <button
          className="mr-4 text-indigo-600 hover:text-indigo-800 focus:outline-none"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          ←
        </button>
        <h1 className="text-xl font-semibold text-indigo-900 truncate">
          Chat with {chat?.participants.find((p) => p._id !== senderId)?.name || "User"}
        </h1>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No messages yet. Start the conversation!</p>
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

      {/* Message Input */}
      <footer className="border-t px-6 py-4 bg-white sticky bottom-0">
        <MessageInput
          receiverId={receiverId!}
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
