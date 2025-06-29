interface Props {
  text: string;
  isSender: boolean;
}

export const MessageBubble = ({ text, isSender }: Props) => {
  return (
    <div
      className={`max-w-[75%] px-4 py-2 rounded-lg ${
        isSender
          ? "ml-auto bg-blue-500 text-white"
          : "mr-auto bg-gray-200 text-black"
      }`}
    >
      {text}
    </div>
  );
};
