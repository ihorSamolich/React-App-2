import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateTask, ITask, IUpdateTask } from '../interfaces/task.ts';
import { listApi } from './list.ts';
const API_URL = import.meta.env.VITE_API_URL;

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  tagTypes: ['Tasks', 'Lists'],
  endpoints: builder => ({
    fetchTask: builder.query<ITask, number>({
      query: id => `/task/${id}`,
    }),
    moveTask: builder.mutation({
      query: ({ id, listId }: { id: number; listId: number }) => ({
        url: `/task/${id}`,
        method: 'PATCH',
        body: { listId },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(listApi.util.invalidateTags(['Lists']));
      },
    }),
    addTask: builder.mutation({
      query: (newTask: ICreateTask) => ({
        url: '/task',
        method: 'POST',
        body: newTask,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(listApi.util.invalidateTags(['Lists']));
      },
    }),

    updateTask: builder.mutation({
      query: (updatedTask: IUpdateTask) => ({
        url: `/task/${updatedTask.id}`,
        method: 'PATCH',
        body: updatedTask,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(listApi.util.invalidateTags(['Lists']));
      },
    }),

    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/task/${id}`,
        method: 'DELETE',
        body: id,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(listApi.util.invalidateTags(['Lists']));
      },
    }),
  }),
});

export const {
  useDeleteTaskMutation,
  useMoveTaskMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
