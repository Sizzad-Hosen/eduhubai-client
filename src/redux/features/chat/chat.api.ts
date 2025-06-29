import { baseApi } from "@/redux/api/baseApi";
import { TMessage } from "@/types/chat.type";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createChat: builder.mutation({
      query: (data) => ({
        url: '/chat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Chats"],
    }),

getChats: builder.query({
  query: () => "/chat",
  transformResponse: (response: any) => response.data, // 👈 only return the chat array
  providesTags: (result) =>
    result
      ? [
          ...result.map(({ _id }: { _id: string }) => ({
            type: "Chats" as const,
            id: _id,
          })),
          { type: "Chats", id: "LIST" },
        ]
      : [{ type: "Chats", id: "LIST" }],
}),

getChatByParticipants: builder.mutation({
  query: (receiverId: string) => ({
    url: '/chat',
    method: 'POST',
    body: { receiverId }
  }),
  transformResponse: (response: any) => response.data,
}),


    // Send a message inside a chat
sendMessage: builder.mutation({
  query: ({ chatId, senderId, receiverId, text }) => ({
    url: '/messages/send',
    method: 'POST',
    body: { chatId, senderId, receiverId, text },
  }),
  // Optionally invalidates messages to refetch or you can update cache manually
  invalidatesTags: (result, error, { chatId }) => [{ type: 'Messages', id: chatId }],
}),

getMessages: builder.query<TMessage[], string>({
  query: (chatId) => `/messages/${chatId}`,
  transformResponse: (response: { success: boolean; message: string; data: TMessage[] }) => response.data,
  providesTags: (result, error, chatId) => [{ type: "Messages", id: chatId }],
}),



  }),
});

export const {
  useCreateChatMutation,
  useGetChatsQuery,
  useSendMessageMutation,
  useLazyGetChatsQuery,
  useGetMessagesQuery,
  useGetChatByParticipantsMutation
} = chatApi;
