"use client";

import React from "react";
import Link from "next/link";

import { Loader } from "lucide-react";
import { useGetChatsQuery } from "@/redux/features/chat/chat.api";

export default function MessageListPage() {
  const { data: chats = [], isLoading } = useGetChatsQuery({});
  console.log(chats)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  if (!chats.length) {
    return <p className="text-center mt-10 text-gray-500">No conversations yet</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded shadow bg-white">
      <h1 className="text-xl font-semibold mb-4">Messages</h1>
      <ul>
        {chats.map((chat) => {
          // Assuming chat.participants is an array of user objects including yourself
          // Replace this logic with your actual data shape
          const otherParticipant = chat.participants.find((p) => !p.isCurrentUser);

          return (
            <li key={chat._id} className="border-b last:border-b-0 py-3 hover:bg-indigo-50 rounded cursor-pointer">
              <Link href={`/message/${chat._id}`} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold uppercase">
                  {otherParticipant?.name[0] || "U"}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{otherParticipant?.name || "User"}</p>
                  <p className="text-sm text-gray-500 truncate max-w-xs">{chat.lastMessage?.text || "No messages yet"}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
