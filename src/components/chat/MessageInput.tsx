'use client';

import { useState, useRef, useEffect } from 'react';
import { Paperclip, Send, Smile } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// import { sendMessage } from '@/redux/features/chat/chatSlice';

interface MessageInputProps {
  receiverId: string;
}

export default function MessageInput({ receiverId }: MessageInputProps) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const senderId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    inputRef.current?.focus();
  }, [receiverId]);

  const handleSend = () => {
    if (!text.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId,
      receiverId,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    dispatch(sendMessage({ receiverId, message }));
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="border-t p-3 bg-white">
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-500 hover:text-blue-500">
          <Paperclip size={20} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="p-2 text-gray-500 hover:text-blue-500">
          <Smile size={20} />
        </button>

        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-400"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
