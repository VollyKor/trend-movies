import { createSlice } from '@reduxjs/toolkit';

import {
  getFavMovies,
  addFavMovie,
  removeFavMovie,
  getFavMoviesList,
} from './favoriteMovies.actions';

const initialState = {
  favMoviesList: [],
  favMovies: [],
  error: null,
};

export const favMovies = createSlice({
  name: 'favMoviesReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFavMovies.fulfilled, (state, { payload }) => {
        state.favMovies = payload;
      })
      .addCase(getFavMoviesList.fulfilled, (state, { payload }) => {
        state.favMoviesList = payload;
      })
      .addCase(addFavMovie.fulfilled, (state, { payload }) => {
        state.favMovies = [...state.favMovies, payload.movie];
      })
      .addCase(removeFavMovie.fulfilled, (state, { payload }) => {
        state.favMovies = state.favMovies.filter(
          film => film.id !== payload.id,
        );
      });
  },
});

export default favMovies.reducer;
