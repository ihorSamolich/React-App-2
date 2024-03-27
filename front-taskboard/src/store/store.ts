import { configureStore } from '@reduxjs/toolkit';
import { listApi } from '../services/list.ts';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(listApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
