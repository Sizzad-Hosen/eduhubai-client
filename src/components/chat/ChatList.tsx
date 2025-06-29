"use client";

import React from "react";
import { useGetChatsQuery } from "@/redux/features/chat/chat.api";
import { useRouter } from "next/navigation";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";

export default function ChatList() {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId || '';
  const { data: chats = [], isLoading } = useGetChatsQuery(userId);

  const router = useRouter();

  if (isLoading) return <div>Loading chats...</div>;

  return (
    <div className="space-y-3 p-3 max-w-md mx-auto">
      {chats.length === 0 && <p>No chats yet.</p>}
      {chats.map((chat) => {
        // Find the other participant (not current user)
        const otherParticipant = chat.participants.find(p => p._id !== userId);

        return (
          <div
            key={chat._id}
            onClick={() => router.push(`/chat/${otherParticipant?._id}`)}
            className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg cursor-pointer transition"
          >
            <div className="font-semibold">{otherParticipant?.name || "Unknown User"}</div>
            <div className="text-sm text-gray-400 truncate">
              Last message: {chat.lastMessage?.text || "No messages yet"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
