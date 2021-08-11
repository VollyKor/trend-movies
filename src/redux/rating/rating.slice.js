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
        console.log('getAverageRating', payload);
        return {
          averageRating: payload.averageRating,
          moviesArr: state.moviesArr,
        };
      })
      .addCase(handleRating.fulfilled, (state, { payload }) => {
        let newArr = state.moviesArr;
        console.log('payload', payload);
        console.log('newArr', newArr);

        const isExist = state.moviesArr.some(
          movie => movie.film_id === payload.film_id,
        );

        if (isExist) {
          newArr = state.moviesArr.map(movie => {
            if (movie.film_id === payload.film_id) return payload;
            return movie;
          });
          state.moviesArr = newArr;
          return;
        }

        newArr.push(payload);
        state.moviesArr = newArr;
      });
  },
});

export default ratingSlice.reducer;
