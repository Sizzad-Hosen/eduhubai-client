import { baseApi } from "@/redux/api/baseApi";

export const chatApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({

    createChat: builder.mutation({
      query: (data) => ({
        url: '/chat',
        method: 'POST',
        body: data,
      }),
    }),
      // Get logged-in user's chats
    getMyChats: builder.query({
      query: () => "/chat",
      providesTags: ["Chats"],
    }),

    // Send a message
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Chats", id: arg.chatId },
      ],
    }),
   
 
  }),
});


export const {
    useCreateChatMutation,
    useGetMyChatsQuery,
    useSendMessageMutation,
    useLazyGetMyChatsQuery
 
} = chatApi;
