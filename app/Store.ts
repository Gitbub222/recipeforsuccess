
import { configureStore } from '@reduxjs/toolkit';
// ... other imports 

import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
}); 