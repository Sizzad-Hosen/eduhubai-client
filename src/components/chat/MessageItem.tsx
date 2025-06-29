'use client';
import Image from 'next/image';


export default function MessageItem({ 
  message,
  isCurrentUser 
}: { 
  message: {
    text: string;
    imageUrl?: string;
    createdAt: string;
  };
  isCurrentUser: boolean;
}) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
        isCurrentUser 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
      }`}>
        {message.imageUrl && (
          <div className="mb-2">
            <Image
              src={message.imageUrl}
              alt="Message attachment"
              width={300}
              height={200}
              className="rounded"
            />
          </div>
        )}
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${
          isCurrentUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}