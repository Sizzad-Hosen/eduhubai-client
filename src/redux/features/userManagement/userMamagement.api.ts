import { baseApi } from "@/redux/api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentRegister: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-student',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

// ✅ Correct hook export
export const { useStudentRegisterMutation} = userManagementApi;
