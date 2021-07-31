import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/auth.slice';
import moviesReducer from 'redux/movies/movies.slice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), thunk],
});
