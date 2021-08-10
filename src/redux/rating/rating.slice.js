import { createSlice } from '@reduxjs/toolkit';
import { getAllRating, getAverageRating, handleRating } from './rating.actions';

const initialState = {
  moviesArr: [],
};

export const ratingSlice = createSlice({
  name: 'movieRating',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllRating.fulfilled, (state, { payload }) => {
        console.log('getAllRating', payload);
        state.moviesArr = payload;
      })
      .addCase(getAverageRating.fulfilled, (state, { payload }) => {
        console.log('getAllRating', payload);
      })
      .addCase(handleRating.fulfilled, (state, { payload }) => {
        const newArr = state.moviesArr.map(film => {
          if (film.film_id === `${payload.filmId}`) {
            return { ...film, rating: payload.rating };
          }
          return film;
        });
        state.moviesArr = newArr;
      });
  },
});

export default ratingSlice.reducer;
