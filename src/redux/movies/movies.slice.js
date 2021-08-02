import { createSlice } from '@reduxjs/toolkit';
import { getTrendMovies, setPage, searchFilms } from './movies.actions';

const initialState = {
  trendMovies: [],
  page: 1,
  totalPages: null,
  error: null,
};

export const counterSlice = createSlice({
  name: 'moviesReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTrendMovies.fulfilled, (state, { payload }) => {
        state.trendMovies = payload.results;
        state.page = payload.page;
        state.totalPages = payload.total_pages;
      })
      .addCase(setPage, (state, action) => {
        state.page = action.payload;
      })
      .addCase(searchFilms.fulfilled, (state, { payload }) => {
        state.trendMovies = payload.results;
        state.page = payload.page;
        state.totalPages = payload.total_pages;
      });
  },
});

export default counterSlice.reducer;
