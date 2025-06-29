'use client';

import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ChatPage() {

  const { id } = useParams();

//   const messages = useSelector((state: RootState) => 
//     state.chat.messages[id as string] || []
//   );

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4">
        <h1 className="text-xl font-semibold">Chat with User {id}</h1>
      </header>
      {/* <MessageList messages={messages} /> */}

      <MessageInput receiverId={id as string} />
    </div>
  );
}