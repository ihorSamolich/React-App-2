import { configureStore } from '@reduxjs/toolkit';
import { listApi } from '../services/list.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { taskApi } from '../services/task.ts';
import { priorityApi } from '../services/priority.ts';
import { historyApi } from '../services/history.ts';
import { boardApi } from '../services/board.ts';

export const store = configureStore({
  reducer: {
    [listApi.reducerPath]: listApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [priorityApi.reducerPath]: priorityApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      listApi.middleware,
      taskApi.middleware,
      priorityApi.middleware,
      historyApi.middleware,
      boardApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
