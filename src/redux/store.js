import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/auth.slice';
import moviesReducer from 'redux/movies/movies.slice';
import ratingReducer from 'redux/rating/rating.slice';
import favMoviesReducer from 'redux/favoriteMovies/favoriteMovies.slice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    rating: ratingReducer,
    favMovies: favMoviesReducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), thunk],
});
