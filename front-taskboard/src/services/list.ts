import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IList } from './../interfaces/list.ts';
const API_URL = import.meta.env.VITE_API_URL;

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  tagTypes: ['Lists'],
  endpoints: builder => ({
    getLists: builder.query<IList[], void>({
      query: () => '/list',
      providesTags: ['Lists'],
    }),

    getBoardLists: builder.query<IList[], number>({
      query: id => `/list/${id}`,
      providesTags: ['Lists'],
    }),

    addList: builder.mutation({
      query: (newList: { name: string; boardId: number }) => ({
        url: '/list',
        method: 'POST',
        body: newList,
      }),
      invalidatesTags: ['Lists'],
    }),
    updateList: builder.mutation({
      query: (updatedList: { id: number; name: string }) => ({
        url: `/list/${updatedList.id}`,
        method: 'PATCH',
        body: updatedList,
      }),
      invalidatesTags: ['Lists'],
    }),
    deleteList: builder.mutation({
      query: ({ id }) => ({
        url: `/list/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Lists'],
    }),
  }),
});

export const { useGetBoardListsQuery, useGetListsQuery, useUpdateListMutation, useAddListMutation, useDeleteListMutation } =
  listApi;
