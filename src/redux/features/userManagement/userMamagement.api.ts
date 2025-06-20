import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TResearcher, TTeacher } from "@/types/userManagement.type";

export const userManagementApi = baseApi.injectEndpoints({
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

    getME: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['user'],
      transformResponse: (response: TResponseRedux<TResearcher | TTeacher>) => {
      
        return response.data;
      },
    }),
 getSingleStudent: builder.query({
  query: (id: string) => ({
    url: `/students/${id}`,
    method: 'GET',
  }),
  providesTags: ['user'],
}),



    // update student user

    updateStudent:builder.mutation({
            query:(args)=>({
                url:`/students/${args.id}`,
                method:'PATCH',
                body:args.data
            }),
            invalidatesTags:['user']
        }),
 
    updateTeacher:builder.mutation({
            query:(args)=>({
                url:`/teachers/${args.id}`,
                method:'PATCH',
                body:args.data
            }),
            invalidatesTags:['user']
        }),
    updateResearcher:builder.mutation({
            query:(args)=>({
                url:`/researchers/${args.id}`,
                method:'PATCH',
                body:args.data
            }),
            invalidatesTags:['user']
        }),
 
  }),
});

// ✅ Correct hook export
export const {
  useGetMEQuery,
  useUpdateTeacherMutation
  ,
useGetSingleStudentQuery
  ,
  useUpdateResearcherMutation
  ,
  useGetAllResearchersQuery,
  useGetAllStudentsQuery,
  useGetAllTeachersQuery,
  useStudentRegisterMutation,
  useTeacherRegisterMutation,
  useResearcherRegisterMutation,
 useUpdateStudentMutation
} = userManagementApi;
