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
