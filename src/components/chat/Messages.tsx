// Messages.jsx

import { useLazyGetMyChatsQuery, useSendMessageMutation } from "@/redux/features/chat/chat.api";
import { useState } from "react";


export const Messages = ({ chatId, currentUserId }) => {

  const { data: messages } = useLazyGetMyChatsQuery(chatId);

  const [sendMessage] = useSendMessageMutation();
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text) return;
    await sendMessage({ chatId, senderId: currentUserId, text });
    setText("");
  };

  return (
    <div>
      <div className="message-list">
        {messages?.map((msg) => (
          <p key={msg._id} style={{ color: msg.senderId === currentUserId ? "blue" : "green" }}>
            {msg.text}
          </p>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
