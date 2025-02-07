import leaderBoardReducer from './slices/leaderboardSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    leaderBoard: leaderBoardReducer
  },
});

export default store;
