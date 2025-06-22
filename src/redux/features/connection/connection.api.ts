import { baseApi } from "@/redux/api/baseApi";



export const conectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    sendConnectionRequest: builder.mutation({
      query: (userInfo) => ({
        url: '/connection/send',
        method: 'POST',
        body: userInfo,
      }),
    }),

   
 
  }),
});

// ✅ Correct hook export
export const {
    useSendConnectionRequestMutation,
  
} = conectionApi;
