export type TMessage = {
  _id: string;          // Unique message ID
  chatId: string;       // ID of the chat this message belongs to
  senderId: string;     // ID of the user who sent the message
  text: string;         // Message content
  createdAt?: string;   // ISO string timestamp of when message was created (optional)
  updatedAt?: string;   // ISO string timestamp if message was edited (optional)
};
