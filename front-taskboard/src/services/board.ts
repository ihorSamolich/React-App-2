import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../interfaces/board.ts';
const API_URL = import.meta.env.VITE_API_URL;

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  tagTypes: ['Board'],
  endpoints: builder => ({
    getBoards: builder.query<IBoard[], void>({
      query: () => '/board',
      providesTags: ['Board'],
    }),

    addBoard: builder.mutation({
      query: (newBoard: { name: string }) => ({
        url: '/board',
        method: 'POST',
        body: newBoard,
      }),
      invalidatesTags: ['Board'],
    }),

    updateBoard: builder.mutation({
      query: (updatedBoard: { id: number; name: string }) => ({
        url: `/board/${updatedBoard.id}`,
        method: 'PATCH',
        body: updatedBoard,
      }),
      invalidatesTags: ['Board'],
    }),

    deleteBoard: builder.mutation({
      query: ({ id }) => ({
        url: `/board/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});

export const { useGetBoardsQuery, useAddBoardMutation, useDeleteBoardMutation, useUpdateBoardMutation } = boardApi;
