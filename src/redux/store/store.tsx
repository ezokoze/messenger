import { configureStore } from '@reduxjs/toolkit';
import conversationSlice from 'redux/slices/conversationSlice';
import userSlice from 'redux/slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    conversation: conversationSlice
  },
});