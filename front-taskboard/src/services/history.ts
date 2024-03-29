import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHistory } from '../interfaces/history.ts';
const API_URL = import.meta.env.VITE_API_URL;

export const historyApi = createApi({
  reducerPath: 'historyApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  tagTypes: ['History'],
  endpoints: builder => ({
    getHistory: builder.query<IHistory[], void>({
      query: () => '/history',
      providesTags: ['History'],
    }),

    fetchHistoryByTask: builder.query<IHistory[], number>({
      query: id => `/history/${id}`,
      providesTags: ['History'],
    }),
  }),
});

export const { useGetHistoryQuery, useFetchHistoryByTaskQuery } = historyApi;
