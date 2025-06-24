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

    getSentRequests: builder.query({
      query: () => "/connection/received",
      
      providesTags: ["Connection"],
    }),


   updateConnectionRequest: builder.mutation({
   query: ({ id, status }) => ({
    url: `/connection/respond/${id}`,
    method: "PUT",
    body: { status },
  }),


  invalidatesTags: ["Connection"],
}),

// getaccepted query

 getRequestConfrim: builder.query({
  query: () => ({
    url: `/connection/getConfrimRequest`,
    method: 'GET',
  }),
  providesTags: ['Connection'],
}),


   
 
  }),
});

// ✅ Correct hook export
export const {
    useSendConnectionRequestMutation,
    useGetSentRequestsQuery,
    useUpdateConnectionRequestMutation,
    useGetRequestConfrimQuery
  
} = conectionApi;
