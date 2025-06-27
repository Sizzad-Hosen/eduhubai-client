type ChatMessageProps = {
  role: "student" | "ai";
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {

console.log("ChatMessage props", { content });

  return (
   <div
  className={`px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${
 
       "bg-blue-500 text-white"
   
  }`}
>
  {content}
</div>

  );
}
