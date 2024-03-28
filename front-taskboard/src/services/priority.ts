import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPriority } from '../interfaces/priority.ts';
const API_URL = import.meta.env.VITE_API_URL;

export const priorityApi = createApi({
  reducerPath: 'priorityApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  tagTypes: ['Priorities'],
  endpoints: builder => ({
    getPriorities: builder.query<IPriority[], void>({
      query: () => '/priority',
      providesTags: ['Priorities'],
    }),
  }),
});

export const { useGetPrioritiesQuery } = priorityApi;
