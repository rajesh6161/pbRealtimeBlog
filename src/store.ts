import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import postReducer from './features/post/postSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
