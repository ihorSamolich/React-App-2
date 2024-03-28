import { configureStore } from '@reduxjs/toolkit';
import { listApi } from '../services/list.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { taskApi } from '../services/task.ts';
import { priorityApi } from '../services/priority.ts';

export const store = configureStore({
  reducer: {
    [listApi.reducerPath]: listApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [priorityApi.reducerPath]: priorityApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      listApi.middleware,
      taskApi.middleware,
      priorityApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
