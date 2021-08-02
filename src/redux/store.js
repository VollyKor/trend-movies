import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/auth.slice';
import moviesReducer from 'redux/movies/movies.slice';
import statisticReducer from 'redux/statistic/statistic.slice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    statistic: statisticReducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), thunk],
});
