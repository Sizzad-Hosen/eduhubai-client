import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TResearcher, TTeacher } from "@/types/userManagement.type";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentRegister: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-student',
        method: 'POST',
        body: userInfo,
      }),
    }),
    teacherRegister: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-teacher',
        method: 'POST',
        body: userInfo,
      }),
    }),
    researcherRegister: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-researcher',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // get ALL DATA
 getAllTeachers: builder.query({
        query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/teachers',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['user'],
      transformResponse: (response: TResponseRedux<TResearcher[]>) => {
        console.log("Transformed Response:", response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllStudents: builder.query({
        query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/students',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['user'],
      transformResponse: (response: TResponseRedux<TResearcher[]>) => {
        console.log("Transformed Response:", response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getAllResearchers: builder.query({
       query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/researchers',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['user'],
      transformResponse: (response: TResponseRedux<TResearcher[]>) => {
        console.log("Transformed Response:", response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
  }),


  }),
});

// ✅ Correct hook export
export const {useGetAllResearchersQuery,useGetAllStudentsQuery,useGetAllTeachersQuery, useStudentRegisterMutation , useTeacherRegisterMutation , useResearcherRegisterMutation} = userManagementApi;
