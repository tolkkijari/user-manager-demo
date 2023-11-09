import { configureStore } from '@reduxjs/toolkit';
import userReducer from './appManagerSlice';

export default configureStore({
  reducer: {
    users: userReducer
  }
});