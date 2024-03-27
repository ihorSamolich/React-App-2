import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IList } from './../interfaces/list.ts';
const API_URL = import.meta.env.VITE_API_URL;

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: builder => ({
    getLists: builder.query<IList[], void>({
      query: () => '/list',
    }),
  }),
});

export const { useGetListsQuery } = listApi;
